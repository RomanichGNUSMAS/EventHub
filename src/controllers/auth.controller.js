const { AuthService } = require('../services/auth.service')
const { nodeEnv } = require('../configs/env')

exports.AuthController = class {
    static async register (req,res,next) {
        const result = await AuthService.register(req.body);
        return res.status(201).json(result);
    }

    static async login (req,res,next) {
        const result = await AuthService.login(req.body);
        res.cookie('refreshToken',result.refreshToken,{
            httpOnly: true,
            maxAge : 7 * 24 * 60 * 60 * 1000,
            secure : nodeEnv === "production"
        })   
        return res.json({ accessToken : result.accessToken });
    }

    static async me (req,res,next) {
        const token = req.headers.authorization.split(' ')[1];
        const result = await AuthService.me(token)
        return res.json(result);
    }

    static async refreshToken (req,res,next) {
        const cookie = req.cookies.refreshToken;
        const result = await AuthService.refresh(cookie);
        res.cookie('refreshToken',result.refreshToken,{
            httpOnly: true,
            maxAge : 7 * 24 * 60 * 60 * 1000,
            secure : nodeEnv === "production"
        })  
        return res.json({ accessToken : result.accessToken })
    }
}