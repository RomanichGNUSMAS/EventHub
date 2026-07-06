require('dotenv').config({ quiet: true });

exports.mongoUrl = process.env.MONGO_URL
exports.jwtSecret = process.env.JWT_SECRET
exports.jwtAccessTime = process.env.JWT_ACCESS_TIME
exports.jwtRefreshTime = process.env.JWT_REFRESH_TIME;