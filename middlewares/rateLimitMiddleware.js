const rateLimit = require("express-rate-limit")

const rateLimitMiddleware = rateLimit({
    windowMs: 60 * 1000,
    max: 10, 
    message: "Too many requests from this IP, please try again after 1 minute"
})

module.exports = {rateLimitMiddleware}