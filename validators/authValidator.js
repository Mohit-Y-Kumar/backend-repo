const Joi = require('joi');

const otpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifySchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
  name: Joi.string().optional(),
  dob: Joi.date().optional(),
});

module.exports = { otpSchema, verifySchema };
