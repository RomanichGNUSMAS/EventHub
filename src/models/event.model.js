const mongoose = require('mongoose');

const TypeObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
    title : { type : String, required: true},
    description : { type : String },
    category : { type : String, required : true },
    location : { type : String, required : true },
    startTime : { type : Date, required: true},
    capacity : { type : Number , required: true},
    endTime : { type : Date, required: true },
    organizerId : { type : TypeObjectId , required : true, ref : "User"},
    agenda : [{
        title : { type : String, required:true },
        time : { type : String, required: true }
    }]
})

exports.eventModel = mongoose.model("Event", eventSchema);