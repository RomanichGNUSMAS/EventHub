const { EventController } = require('../controllers/event.controller');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router({ mergeParams : true });

router.post('/', asyncHandler(EventController.newEvent));
router.get('/category', asyncHandler(EventController.eventsByCategory));
router.get('/:id', asyncHandler(EventController.oneEvent));
router.put('/:eventId', asyncHandler(EventController.updateEvent));
router.delete('/:eventId', asyncHandler(EventController.deleteEvent));

exports.eventRoutes = router;