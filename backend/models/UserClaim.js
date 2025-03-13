const mongoose = require('mongoose');

const userClaimSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  cookieId: { type: String, required: true },
  lastClaimTime: { type: Date, required: true },
});

module.exports = mongoose.model('UserClaim', userClaimSchema);