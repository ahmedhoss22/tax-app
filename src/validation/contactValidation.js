const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
    "string.base": "Email must be a string",
  }),
  name: Joi.string().required().messages({
    "any.required": "name is required",
    "string.base": "name must be a string",
  }),
  subject: Joi.string().required().messages({
    "any.required": "Subject is required",
    "string.base": "Subject must be a string",
  }),
  title: Joi.string().required().messages({
    "any.required": "title is required",
    "string.base": "title must be a string",
  }),
  message: Joi.string().required().messages({
    "any.required": "Message content is required",
    "string.base": "Message must be a string",
  }),
});

module.exports = { contactSchema };
