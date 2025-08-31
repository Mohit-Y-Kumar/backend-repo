const Joi = require('joi');

const noteSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().max(5000).allow(''),
});

module.exports = { noteSchema };
