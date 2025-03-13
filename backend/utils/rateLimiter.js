const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1, // 1 request per IP
  keyGenerator: (req) => req.ip, // Use IP as the key
  message: { 
    message: 'You can only claim one coupon per hour. Please try again later.',
    status: 429,
  },
  handler: (req, res, next, options) => {
    console.log(`Rate limit reached for IP: ${req.ip}`);
    res.status(429).json(options.message); // Send the custom message
  },
});

module.exports = limiter;