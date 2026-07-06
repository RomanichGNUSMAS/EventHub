const { AuthRepository } = require("../repositories/auth.repository")
const { AppError } = require('../errors/AppError')
const { AuthRegister } = require('../validators/auth.validator') 

exports.AuthService = class {
    static async register(rawData) {
        const validation = AuthRegister.safeParse(rawData);
        if(!validation.success) throw new AppError('invalid credentials', 400);
        const result = await AuthRepository.register(rawData)
        switch ( result ) {
            case 409 : {
                throw new AppError('user with this email already exists', 409)
            }
            default : {
                return result;
            }
        }
    }

    static async login(rawData) {
        const validation = AuthRegister.safeParse(rawData)
        if(!validation.success) throw new AppError('invalid credentials', 400);
        const result = await AuthRepository.login(rawData)
        switch ( result ) {
            case 404 : {
                throw new AppError('user not found', 404);
            }
            case 400 : {
                throw new AppError('invalid email or password', 400);
            } 
            default : {
                return result;
            }
        }
    }

    static async me(token) {
        const result = await AuthRepository.me(token);
        switch ( result ) {
            case 403 : {
                throw new AppError('invalid token, or token expired', 403);
            }

            default : {
                return result;
            }
        }
    }

    static async refresh(token) {
        const result = await AuthRepository.refresh(token);
        switch ( result ) {
            case 403 : {
                throw new AppError('invalid refresh token or expired', 403);
            }

            case 404 : {
                throw new AppError('user with this refresh token not found', 404);
            }

            default : {
                return result;
            }
        }
    }

    static async logOut(token) {
        const result = await AuthRepository.logOut(token);
        switch ( result ) {
            case 403 : {
                throw new AppError('invalid token or expired', 403);
            }

            default : {
                return null;
            }
        }
    }
}