const { default: z, email } = require("zod");

exports.AuthRegister = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
    role : z.string().optional()
})

exports.AuthLogin = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})