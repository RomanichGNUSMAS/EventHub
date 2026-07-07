const { MongooseError } = require("mongoose");

exports.errorHandler = (err,req,res,next) => {
    if(err.isOperational) {
        return res.status(err.statusCode).json(err);
    }
    if(err instanceof MongooseError) {
        return res.status(400).json(err)
    }
    return res.status(500).json(err)
}