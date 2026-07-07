const mongoose = require("mongoose");
const { eventModel } = require("../models/event.model");
const { attendanceModel } = require('../models/attendance.model');
const { userModel } = require("../models/user.model");

const toObjectId = mongoose.Types.ObjectId;

exports.AttendanceRepository = class {
    static async joinToEvent(eventId, userId) {
        const event_found = await eventModel.findById(new toObjectId(eventId));
        const user_found = await userModel.findById(new toObjectId(userId));

        if (!event_found || !user_found) return 404;

        const count = await attendanceModel.countDocuments({ eventId: new toObjectId(eventId) });

        if (count >= event_found.capacity) {
            return 400;
        }

        const alreadyJoined = await attendanceModel.findOne({
            eventId: new toObjectId(eventId),
            userId: new toObjectId(userId)
        });
        
        if (alreadyJoined) return 409;

        const newAttendance = new attendanceModel({ 
            userId: new toObjectId(userId), 
            eventId: new toObjectId(eventId), 
            startTime: new Date()
        });

        return await newAttendance.save();
    }

    static async leaveAtThisEvent(eventId, userId) {
        const deleted = await attendanceModel.findOneAndDelete({
            eventId: new toObjectId(eventId),
            userId: new toObjectId(userId)
        });

        if (!deleted) return 404;
        return deleted;
    }
};