const mongoose = require("mongoose");
const { eventModel } = require('../models/event.model');
const { userModel } = require("../models/user.model");

const toObjectId = mongoose.Types.ObjectId;

exports.EventRepository = class {
    static async createEvent(rawData) {
        const found = await userModel.findById(new toObjectId(rawData.organizerId));
        if (!found) return 404;

        const newEvent = new eventModel(rawData);
        return await newEvent.save();
    }

    static async seeEventsByCategory({ page = 1, limit = 10, category, startDate, endDate }) {
        const query = {};
        if (category) query.category = category;

        if (startDate || endDate) {
            query.startTime = {};
            if (startDate) query.startTime.$gte = new Date(startDate);
            if (endDate) query.startTime.$lte = new Date(endDate);
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const parsedLimit = parseInt(limit);

        const events = await eventModel.find(query)
            .skip(skip)
            .limit(parsedLimit)
            .sort({ startTime: 1 });
            
        const total = await eventModel.countDocuments(query);

        return { events, total, page: parseInt(page), limit: parsedLimit };
    }

    static async oneEventById(eventId) {
        return await eventModel.findById(new toObjectId(eventId));
    }

    static async updateEvent(rawData, eventId, organizerId) {
        const found = await eventModel.findById(new toObjectId(eventId));
        if (!found) return 404;

        if (!found.organizerId.equals(new toObjectId(organizerId))) return 403;
        
        const { _id, organizerId: _, ...clearData } = rawData;
        found.set(clearData);
        
        return await found.save(); 
    }

    static async deleteEvent(eventId, organizerId) {
        const found = await eventModel.findById(new toObjectId(eventId));
        if (!found) return 404;
        if (!found.organizerId.equals(new toObjectId(organizerId))) return 403;
        
        await found.deleteOne();
        return true;
    }
};