const { ReviewController } = require('../controllers/review.controller');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router();

router.post('/:eventId', asyncHandler(ReviewController.addReview));
router.get('/:eventId', asyncHandler(ReviewController.getReviewsForEvent));

exports.reviewRoutes = router;