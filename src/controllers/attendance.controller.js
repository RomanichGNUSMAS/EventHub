const { AttendaceService } = require("../services/attendance.service");

exports.AttendanceController = class {
    static async join(req, res, next) {
        const { params: { eventId, userId } } = req;
        const result = await AttendaceService.joinToEvent(eventId, userId)
        return res.status(201).json(result);
    }

    static async leave(req, res, next) {
        const { params: { eventId, userId } } = req;
        const result = await AttendaceService.leaveAtEvent(eventId, userId);
        return res.json(result);
    }
}