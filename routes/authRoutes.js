const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const Otp = require('../models/Otp');
const User = require('../models/User');
const { otpSchema, verifySchema } = require('../validators/authValidator');

async function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}


router.post('/request-otp', async (req, res, next) => {
  try {
    const { error } = otpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const email = req.body.email.toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await Otp.findOneAndDelete({ email });
    await new Otp({ email, otpHash, expiresAt }).save();

    const transporter = await createTransport();
    await transporter.sendMail({
      from: `"Notes App" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for Notes App",
      text: `Your OTP: ${otp}. It expires in 10 minutes.`,
    });

    res.json({ message: 'OTP sent (check email).' });
  } catch (err) {
    next(err);
  }
});

router.post('/verify-otp', async (req, res, next) => {
  try {
    const { error } = verifySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, otp, name, dob } = req.body;
    const record = await Otp.findOne({ email });
    if (!record || record.expiresAt < new Date())
      return res.status(400).json({ error: 'OTP expired or not found' });

    const ok = await bcrypt.compare(otp, record.otpHash);
    if (!ok) return res.status(400).json({ error: 'Wrong OTP' });

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name: name || email.split('@')[0],
        dob: dob || null,
      });
      await user.save();
    }
    await Otp.deleteOne({ _id: record._id });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, dob: user.dob } });
  } catch (err) {
    next(err);
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/oauth-success?token=${token}`);
  });

module.exports = router;
