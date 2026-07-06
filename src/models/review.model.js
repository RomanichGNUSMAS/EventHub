const mongoose = require('mongoose');

const TypeObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema({
    comment : { type : String },
    rating : { type : Number, required : true },
    userId : { type : TypeObjectId, required : true },
    eventId : { type : TypeObjectId , required : true }
})

exports.reviewModel = mongoose.model('Review',reviewSchema)