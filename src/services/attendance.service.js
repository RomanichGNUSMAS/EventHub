const { AttendanceRepository } = require("../repositories/attendance.repository")
const { AppError } = require('../errors/AppError')

exports.AttendaceService = class {
    static async joinToEvent(eventId, userId) {
        const result = await AttendanceRepository.joinToEvent(eventId, userId)
        switch ( result ) {
            case 404 : {
                throw new AppError('something not found', 404)
            }

            case 400 : {
                throw new AppError('You cannot join because capacity is full', 400)
            }

            case 409 : {
                throw new AppError('you\'re already joined ')
            }

            default : {
                return result;
            }
        }
    }

    static async leaveAtEvent(eventId,userId) {
       const result = await AttendanceRepository.leaveAtThisEvent(eventId,userId);
       switch ( result ) {
            case 404 : {
                throw new AppError('user had already left', 404);
            }
            default : {
                return result;
            }
       } 
    }
}