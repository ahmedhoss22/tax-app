const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.base": "Title must be a string",
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.base": "Description must be a string",
  }),
  tags: Joi.string().required().messages({
    "any.required": "Tags is required",
    "string.base": "Tags must be a string",
  }),
  categories: Joi.string().required().messages({
    "any.required": "Categories is required",
    "string.base": "Categories must be a string",
  }),
  image: Joi.string(),
});
const updateBlogSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "Title must be a string",
  }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
  tags: Joi.string().messages({
    "string.base": "Tags must be a string",
  }),
  categories: Joi.string().messages({
    "string.base": "Categories must be a string",
  }),
  image: Joi.string(),
});

module.exports = { blogSchema,updateBlogSchema };
