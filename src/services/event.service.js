const { EventRepository } = require("../repositories/event.repository")
const { AppError } = require('../errors/AppError');
const { eventCreate, getByCategory } = require("../validators/event.validator");

exports.EventService = class {
    static async createEvent(rawData) {
        const validation = eventCreate.safeParse(rawData);
        if (!validation.success) throw new AppError('invalid credentials', 400);
        const result = await EventRepository.createEvent(rawData);
        switch (result) {
            case 404: {
                throw new AppError('organizer not found', 404);
            }

            default: {
                return result;
            }
        }
    }

    static async eventsByCategory(rawData) {
        const validation = getByCategory.safeParse(rawData)
        if (!validation.success) throw new AppError('invalid credentials', 400);
        return await EventRepository.seeEventsByCategory(rawData);
    }

    static async getOneEvent(eventId) {
        return await EventRepository.oneEventById(eventId)
    }

    static async updateEvent(rawData, eventId, organizerId) {
        const result = await EventRepository.updateEvent(rawData, eventId, organizerId);
        switch (result) {
            case 404: {
                throw new AppError('event not found', 404);
            }

            case 403: {
                throw new AppError('you are nor organizer of this event', 403)
            }

            default: {
                return result;
            }
        }
    }
    static async deleteEvent(eventId, organizerId) {
        const result = await EventRepository.deleteEvent(rawData, eventId, organizerId);
        switch (result) {
            case 404: {
                throw new AppError('event not found', 404);
            }

            case 403: {
                throw new AppError('you are nor organizer of this event', 403)
            }

            default: {
                return result;
            }
        }
    }

}