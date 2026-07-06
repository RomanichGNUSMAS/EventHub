const { userModel } = require("../models/user.model");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { createRefreshToken, createToken, verifyToken, verifyRefreshToken } = require("../utils/jwt");

exports.AuthRepository = class {
    static async register(rawData) {
        const found = await userModel.findOne({ email: rawData.email });
        if (found) return 409;

        const hashedPassword = await hashPassword(rawData.password);
        const newUser = new userModel({ ...rawData, password: hashedPassword });
        await newUser.save();

        const user = newUser.toObject();
        delete user.password;
        delete user.refreshToken;
        return user;
    }

    static async login(rawData) {
        const found = await userModel.findOne({ email: rawData.email });
        if (!found) return 404;

        const compareResult = await comparePassword(rawData.password, found.password);
        if (!compareResult) return 400;

        const tokenPayload = { id: found._id, role: found.role };
        const accessToken = createToken(tokenPayload);
        const refreshToken = createRefreshToken(tokenPayload);

        found.refreshToken = await hashPassword(refreshToken);
        await found.save();

        return {
            accessToken,
            refreshToken,
            user: { _id: found._id, name: found.name, email: found.email, role: found.role }
        };
    }

    static async me(token) {
        const jwt = verifyToken(token);
        if (!jwt) return 403;

        return await userModel.findById(jwt.id).select("-password -refreshToken");
    }

    static async refresh(token) {
        const jwt = verifyRefreshToken(token);
        if (!jwt) return 403;

        const found = await userModel.findById(jwt.id);
        if (!found || !found.refreshToken) return 404;

        const isTokenValid = await comparePassword(token, found.refreshToken);
        if (!isTokenValid) return 403;

        const tokenPayload = { id: found._id, role: found.role };
        const newAccessToken = createToken(tokenPayload);
        const newRefreshToken = createRefreshToken(tokenPayload);

        found.refreshToken = await hashPassword(newRefreshToken);
        await found.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }

    static async logOut(token) {
        const jwt = verifyRefreshToken(token);
        if (!jwt) return 403;

        return await userModel.findByIdAndUpdate(jwt.id, {
            $set: { refreshToken: null }
        });
    }
};