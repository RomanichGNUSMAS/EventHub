const mongoose = require('mongoose');
const { userModel } = require('../models/user.model');
const { eventModel } = require('../models/event.model');
const { attendanceModel } = require('../models/attendance.model');
const { reviewModel } = require('../models/review.model');

const toObjectId = mongoose.Types.ObjectId;

exports.ReviewRepository = class {
    static async addReview(rawData, userId, eventId) {
        const user = await userModel.findById(toObjectId(userId));
        const event = await eventModel.findById(toObjectId(eventId));
        if (!user || !event) return 404;

        const attendance = await attendanceModel.findOne({
            userId: toObjectId(userId),
            eventId: toObjectId(eventId)
        });
        if (!attendance) return 403;

        const existingReview = await reviewModel.findOne({
            userId: toObjectId(userId),
            eventId: toObjectId(eventId)
        });
        if (existingReview) return 400;

        const newReview = new reviewModel({
            ...rawData,
            userId: toObjectId(userId),
            eventId: toObjectId(eventId)
        });
        
        return await newReview.save();
    }

    static async getReviewsForAnEvent(eventId) {
        return await reviewModel.find({ eventId: toObjectId(eventId) }).populate('userId', 'name email');
    }
};