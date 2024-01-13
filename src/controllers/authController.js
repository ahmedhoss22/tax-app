const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { createSendToken } = require('../utility/createSendToken')
module.exports = {
    registrationCtrl: asyncHandler(async (req, res) => {
        const emailInUse = await User.findOne({ email: req.body.email });
        if (emailInUse) return res.status(400).json({ success: false, error: "Email is already in use." });
        const user = new User(req.body)
        await user.save()
        res.status(201).json({ success: true, message: "Account successfully created. Please login." });
    }),
    loginCtrl: asyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ success: false, error: "don't have account ? please signup" });
        const matchPassword = await user.comparePassword(req.body.password);
        if (!matchPassword) return res.status(400).json({ success: false, error: "Incorrect password. Please check your password and try again." });
        createSendToken(user, 200, res);
    }),
    getCurrentUserCtrl: asyncHandler(async (req, res) => {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) return res.status(404).json({ success: false, error: "user not found." })
        res.status(200).json({ success: true, data: user });
    }),
    logOut : asyncHandler(async(req,res)=>{
        res.clearCookie("jwt")
        res.status(200).json({success:true})
    })
}