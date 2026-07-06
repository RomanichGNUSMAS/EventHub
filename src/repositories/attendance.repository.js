const mongoose = require("mongoose");
const { eventModel } = require("../models/event.model");
const { attendanceModel } = require('../models/attendance.model');
const { userModel } = require("../models/user.model");

const toObjectId = mongoose.Types.ObjectId;

exports.AttendanceRepository = class {
    static async joinToEvent(eventId, userId) {
        const event_found = await eventModel.findById(toObjectId(eventId));
        const user_found = await userModel.findById(toObjectId(userId));

        if (!event_found || !user_found) return 404;

        const count = await attendanceModel.countDocuments({ eventId: toObjectId(eventId) });

        if (count >= event_found.capacity) {
            return 400;
        }

        const alreadyJoined = await attendanceModel.findOne({
            eventId: toObjectId(eventId),
            userId: toObjectId(userId)
        });
        
        if (alreadyJoined) return 409;

        const newAttendance = new attendanceModel({ 
            userId: toObjectId(userId), 
            eventId: toObjectId(eventId), 
            startDate: new Date()
        });

        return await newAttendance.save();
    }

    static async leaveAtThisEvent(eventId, userId) {
        const deleted = await attendanceModel.findOneAndDelete({
            eventId: toObjectId(eventId),
            userId: toObjectId(userId)
        });

        if (!deleted) return 404;
        return deleted;
    }
};