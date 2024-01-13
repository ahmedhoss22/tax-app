const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authenticate = async (req, res, next) => {
    let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    // ) { token = req.headers.authorization.split(" ")[1]; }
     token = req.cookies.jwt
    //  console.log(token)
    if (!token) return res.status(401).json({ success: false, error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
    const freshUser = await User.findById(decoded._id);
    if (!freshUser) return res.status(403).json({ success: false, error: 'The user belonging to this token does no longer exist' });
    req.user = freshUser;
    next();
}

const authorizeRoles = (allowedRole) => (req, res, next) => {
    authenticate(req, res, () => {
        const hasMatchingRole = req.user.role === allowedRole
        if (hasMatchingRole) {
            next();
        } else {
            res.status(403).json({ success: false, error: "Access forbidden: You do not have the necessary role(s) to access this resource." });
        }
    });
};
module.exports = {
    authenticate,
    authorizeAdmin: authorizeRoles("Admin"),
};