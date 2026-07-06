const jwt = require('jsonwebtoken');
const { jwtSecret,jwtAccessTime,jwtRefreshTime, jwtRefreshSecret } = require('../configs/env');

exports.createToken = ({ id, role }) => {
    return jwt.sign({ id,role },jwtSecret, {
        expiresIn : jwtAccessTime
    });
}

exports.createRefreshToken = ({ id,role }) => {
    return jwt.sign({ id,role },jwtRefreshSecret, {
        expiresIn: jwtRefreshTime
    })
}

exports.verifyToken = (token) => {
    try {
        const payload = jwt.verify(token,jwtSecret)
        return payload
    } catch {
        return null
    }
}

exports.verifyRefreshToken = (token) => {
    try {
        const payload = jwt.verify(token,jwtRefreshSecret)
        return payload
    } catch {
        return null
    }
}