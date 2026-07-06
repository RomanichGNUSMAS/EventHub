const { AttendanceController } = require('../controllers/attendance.controller');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router();

router.post('/:eventId/join', asyncHandler(AttendanceController.join));
router.delete('/:eventId/leave', asyncHandler(AttendanceController.leave));

exports.attendanceRoutes = router;