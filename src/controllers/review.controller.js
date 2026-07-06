const { ReviewService } = require("../services/review.service");

exports.ReviewController = class {
    static async addReview (req,res,next) {
        const { params : { eventId, userId }} = req;
        const result = await ReviewService.addReview(req.body,userId,eventId)
        return res.status(201).json(result);
    }

    static async getReviewsForEvent (req,res,next) {
        const { params : { eventId }} = req;
        const result = await ReviewService.getReviewsByEvent(eventId);
        return res.json(result)
    }
}