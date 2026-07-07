const { EventController } = require('../controllers/event.controller');
const { hasValidToken, isOrganizer } = require('../middlewares/check.middleware');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router({ mergeParams : true });

router.post('/',hasValidToken, isOrganizer, asyncHandler(EventController.newEvent));
router.get('/category', asyncHandler(EventController.eventsByCategory));
router.get('/:id', asyncHandler(EventController.oneEvent));
router.put('/:eventId',hasValidToken, isOrganizer, asyncHandler(EventController.updateEvent));
router.delete('/:eventId',hasValidToken, isOrganizer, asyncHandler(EventController.deleteEvent));

exports.eventRoutes = router;