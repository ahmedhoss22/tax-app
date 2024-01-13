const Joi = require("joi");
module.exports = {
  paperValidationSchema: Joi.object().keys({
    paper: Joi.string(),
    title: Joi.string().required().trim().messages({
      "string.base": "Title must be a string",
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),

    status: Joi.string().valid("valid", "not valid").required().messages({
      "any.only": 'Status must be either "valid" or "not valid"',
      "any.required": "Status is required",
    }),
    category: Joi.string().required().messages({
      "any.only": "Category must be a string",
      "any.required": "Category is required",
    }),
    description: Joi.string().required().messages({
      "any.only": "description must be a string",
      "any.required": "description is required",
    }),
    company: Joi.boolean().required().messages({
      "boolean.base": "Company must be a boolean",
      "any.required": "Company is required",
    }),
  }),
};
