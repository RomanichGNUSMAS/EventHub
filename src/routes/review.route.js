const { ReviewController } = require('../controllers/review.controller');
const { hasValidToken } = require('../middlewares/check.middleware');
const { asyncHandler } = require('../utils/asyncHandler');
const router = require('express').Router();

router.post('/:eventId',hasValidToken, asyncHandler(ReviewController.addReview));
router.get('/:eventId', asyncHandler(ReviewController.getReviewsForEvent));

exports.reviewRoutes = router;