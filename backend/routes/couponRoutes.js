const express = require('express');
const couponController = require('../controllers/couponController');
const limiter = require('../utils/rateLimiter');
const router = express.Router();

router.get('/claim-coupon', limiter, couponController);

module.exports = router;