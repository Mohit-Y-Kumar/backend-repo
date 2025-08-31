const mongoose = require('mongoose');
const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});
module.exports = mongoose.model('Otp', OtpSchema);
