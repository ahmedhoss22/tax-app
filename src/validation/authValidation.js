const Joi = require('joi')
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
module.exports = {
    registrationSchema: Joi.object().keys({
        username: Joi.string().min(3).max(30).required().messages({
            'any.required': 'user name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.base': 'Email must be a string',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        password: Joi.string().regex(passwordRegex).required().messages({
            'string.base': 'Password must be a string',
            'string.pattern.base': 'Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long',
            'any.required': 'Password is required'
        }),
    }),
    loginUserSchema: Joi.object({
        email: Joi.string().email().required().messages({
            'any.required': 'Email is required.',
            'string.empty': 'Email must not be empty.',
            'string.email': 'Email must be a valid email address.',
        }),
        password: Joi.string().pattern(passwordRegex).required().messages({
            'any.required': 'Password is required.',
            'string.empty': 'Password must not be empty.',
            'string.pattern.base': 'Password must contain at least 8 characters, including one digit, one lowercase letter, one uppercase letter, and one special character.'

        })
    }),

}

