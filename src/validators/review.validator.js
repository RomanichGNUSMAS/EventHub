const { default: z } = require("zod");

exports.reviewCreate = z.object({
    comment: z.string().optional(),
    rating : z.number().min(1).max(5),
    userId: z.string(),
    eventId: z.string()
})