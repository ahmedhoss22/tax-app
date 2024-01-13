const jwt = require('jsonwebtoken')
const signToken = (id) =>
    jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        withCredentials: true, httpOnly: false,
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);
    res.status(statusCode).json({
        success:true,
        token, 
        data: {
            user,
        },
    });
};
module.exports = { createSendToken }