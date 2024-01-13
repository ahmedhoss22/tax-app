const Joi = require("joi");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
module.exports = {
  createNewUserSchema: Joi.object({
    username: Joi.string().required().messages({
      "any.required": "user name is required.",
      "string.empty": "user name must not be empty.",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required.",
      "string.empty": "Email must not be empty.",
      "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().pattern(passwordRegex).required().messages({
      "any.required": "Password is required.",
      "string.empty": "Password must not be empty.",
      "string.pattern.base":
        "Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.",
    }),
  }),
  updateAddress: Joi.object().keys({
    StreetName: Joi.string(),
    StreetNumber: Joi.string(),
    City: Joi.string(),
    Country: Joi.string(),  
  }),
  updateUserProfile: Joi.object().keys({
    username: Joi.string().messages({
      "any.required": "user name is required.",
      "string.empty": "user name must not be empty.",
    }),
    image: Joi.string(),
    phoneNumber: Joi.string(),
  }).unknown(true) ,
  updateUserSchema: Joi.object({
    username: Joi.string().messages({
      "any.required": "user name is required.",
      "string.empty": "user name must not be empty.",
    }),
    email: Joi.string().email().messages({
      "any.required": "Email is required.",
      "string.empty": "Email must not be empty.",
      "string.email": "Email must be a valid email address.",
    }),
    password: Joi.string().pattern(passwordRegex).messages({
      "any.required": "Password is required.",
      "string.empty": "Password must not be empty.",
      "string.pattern.base":
        "Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.",
    }),
  }),
};
