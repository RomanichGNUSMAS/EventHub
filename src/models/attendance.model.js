const mongoose = require('mongoose');

const TypeObjectId = mongoose.Schema.Types.ObjectId;

const attendanceSchema = new mongoose.Schema({
    userId : { type: TypeObjectId, required: true, ref : "User" },
    eventId : { type : TypeObjectId, required : true, ref : "Event" },
    startTime : { type : Date, required: true}
})

exports.attendanceModel = mongoose.model('Attendance', attendanceSchema)