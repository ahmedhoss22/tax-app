const Joi = require("joi");
const serviceSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string",
    "any.required": "Title is required",
  }),

  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
  }),
  user: Joi.string().required().messages({
    "string.base": "user must be a string",
    "any.required": "user is required",
  }),
  img: Joi.string(),
  status: Joi.string().messages({
    "string.base": "Status must be a string",
  }),
});

module.exports = { serviceSchema };
