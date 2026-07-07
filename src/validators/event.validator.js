const { default: z } = require("zod");


exports.eventCreate = z.object({
    title : z.string(),
    category : z.string(),
    location : z.string(),
    startTime : z.string(),
    capacity : z.number().min(3),
    endTime : z.string(),
})

exports.getByCategory = z.object({
    category : z.string(),
    page : z.number().optional().default(1),
    limit : z.number().optional().default(10),
    startDate: z.string(),
    endDate: z.string()
})