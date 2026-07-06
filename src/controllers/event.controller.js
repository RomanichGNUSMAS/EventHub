const { EventService } = require("../services/event.service")

exports.EventController = class {
    static async newEvent(req, res, next) {
        const result = await EventService.createEvent(req.body);
        return res.status(201).json(result);
    }

    static async eventsByCategory(req, res, next) {
        const result = await EventService.eventsByCategory(req.query.category);
        return res.json(result);
    }

    static async oneEvent(req, res, next) {
        const { params: { id } } = req;
        const result = await EventService.getOneEvent(id);
        return res.json(result)
    }

    static async updateEvent(req, res, next) {
        const { params: { eventId, organizerId } } = req;
        const result = await EventService.updateEvent(req.body,eventId, organizerId);
        return res.json(result)
    }

    static async deleteEvent(req, res, next) {
        const { params: { eventId, organizerId } } = req;
        const result = await EventService.deleteEvent(eventId, organizerId)
        return res.sendStatus(200)
    }
}