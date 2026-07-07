const { default: mongoose } = require("mongoose");
const { AppError } = require("../errors/AppError");
const { userModel } = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");
const { asyncHandler } = require("../utils/asyncHandler");

exports.hasValidToken = asyncHandler(async (req,res,next) => {
    const token = req.headers.authorization;
    if(!token?.trim() || !token.startsWith('Bearer'))
        return next(new AppError('invalid token', 401))
    const verify = verifyToken(token.split(' ')[1]);
    if(!verify) return next(new AppError('invalid token or expired', 403));
    req.user = verify;
    next()
})

exports.isOrganizer = asyncHandler(async (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    const jwt = verifyToken(token);
    const id = new mongoose.Types.ObjectId(jwt.id);

    const organizer = await userModel.findById(id);
    if (!organizer || organizer.role !== "Organizer")
        return next(new AppError('you cannot do this operation', 403))
    next();
})