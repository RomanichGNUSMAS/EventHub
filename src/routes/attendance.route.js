const { AttendanceController } = require('../controllers/attendance.controller');
const { hasValidToken } = require('../middlewares/check.middleware');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router();

router.post('/:eventId/join',hasValidToken, asyncHandler(AttendanceController.join));
router.delete('/:eventId/leave',hasValidToken, asyncHandler(AttendanceController.leave));

exports.attendanceRoutes = router;