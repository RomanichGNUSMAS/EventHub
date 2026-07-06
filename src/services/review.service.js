const { reviewCreate } = require("../validators/review.validator")
const { AppError } = require('../errors/AppError')
const { ReviewRepository } = require("../repositories/review.repository")

exports.ReviewService = class {
    static async addReview(rawData, userId, eventId) {
        const validation = reviewCreate.safeParse({ ...rawData, userId, eventId })
        if (!validation.success) throw new AppError('invalid credentials', 400)
        const result = await ReviewRepository.addReview(rawData,userId,eventId)
        switch ( result ) {
            case 400 : {
                throw new AppError('review already exists', 400)
            }
            case 403 : {
                throw new AppError('you haven\'t attendance on this event', 403);
            }
            case 404 :{
                throw new AppError('something not found', 404);
            }
            default : {
                return result
            }
        }
    }

    static async getReviewsByEvent(eventId) {
        const result = await ReviewRepository.getReviewsForAnEvent(eventId);
        if(result?.length == 0) throw new AppError('reviews not found', 404); 
        return result
    }
}