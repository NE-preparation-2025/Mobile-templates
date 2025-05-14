import rateLimit from 'express-rate-limit'

export const rateLimitingMiddleware = () => {
    const rateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 300,
        message: 'You have exceeded the 300 requests in 15 minutes limit!',
        headers: true
    })

    return rateLimiter
}