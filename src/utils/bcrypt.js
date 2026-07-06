const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
    const saltCount = 10;
    return bcrypt.hash(password,saltCount)
}

exports.comparePassword = (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}