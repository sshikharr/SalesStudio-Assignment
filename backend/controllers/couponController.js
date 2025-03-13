const Coupon = require('../models/Coupon');
const UserClaim = require('../models/UserClaim');

const couponController = async (req, res) => {
  try {
    const ip = req.ip;
    const cookieId = req.cookies['coupon_tracker'] || Math.random().toString(36).substring(2);

    // Check existing claim (this is additional to limiter, which is fine)
    const existingClaim = await UserClaim.findOne({ $or: [{ ip }, { cookieId }] });
    if (existingClaim) {
      const timeSinceLastClaim = Date.now() - existingClaim.lastClaimTime;
      if (timeSinceLastClaim < 5 * 1000) { // 5 seconds
        const remaining = Math.ceil((5 * 1000 - timeSinceLastClaim) / 1000); // Remaining time in seconds
        return res.status(429).json({
          message: `Please wait ${remaining} seconds before claiming another coupon.`,
        });
      }
    }

    // Find next available coupon
    const coupon = await Coupon.findOneAndUpdate(
      { isClaimed: false },
      { isClaimed: true, claimedBy: ip, claimTime: new Date() },
      { new: true }
    );

    if (!coupon) return res.status(404).json({ message: 'No coupons available' });

    // Record claim
    await UserClaim.findOneAndUpdate(
      { ip },
      { ip, cookieId, lastClaimTime: new Date() },
      { upsert: true }
    );

    // Set cookie
    res.cookie('coupon_tracker', cookieId, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    console.log('Coupon claimed successfully!', coupon.code);

    res.json({ message: 'Coupon claimed successfully!', coupon: coupon.code });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = couponController;