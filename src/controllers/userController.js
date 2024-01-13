const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const asyncHandler = require("express-async-handler");
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.status(200).json(users);
});
const getOneUser = asyncHandler(async (req, res) => {
 console.log("ccccccccccccccccccccccccccccccccccccc", req.params.id);
  const user = await User.findOne({ _id: req.params.id });
  console.log(user);
  if (!user){
     return res.status(404).json({ success: false, error: "user not found." });
  }
  console.log("hhhh");
  res.status(200).json({ success: true, data: user });
});
const createNewUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const duplicate = await User.findOne({ email });
  if (duplicate)
    return res.status(409).json({ message: "this email already in use...!" });
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ data: user, message: `New user ${username} created` });
});
const updateUserProfileCtrl = asyncHandler(async (req, res) => {
  console.log("req.file", req.file);
  if (req.file) req.body.profileImage = `users/${req.file.filename}`;
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true }
  );
  if (!updatedUser)
    return res.status(404).json({ success: false, error: "user not found." });
  res.status(200).json({ success: true, data: updatedUser });
});
const updateUserAddress = asyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { new: true }
  );
  if (!updatedUser)
    return res.status(404).json({ success: false, error: "user not found." });
  res.status(200).json({ success: true, data: updatedUser });
});
const updateUser = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  if (req.file && req.file.filename) {
    req.body.profileImage = `users/${req.file.filename}`;
  }
  const user = await User.findOne({ _id: id });
  if (!user) return res.status(400).json({ message: "User not found" });
  const duplicate = await User.findOne({
    _id: { $ne: req.params.id },
    email: req.body.email,
  });
  if (duplicate)
    return res
      .status(400)
      .json({ success: false, error: `This email already in use ..!` });
  if (password) {
    const genSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, genSalt);
    req.body.password = hash;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.json({ data: updateUser, message: `${updatedUser.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
  if (!deletedUser)
    return res.status(404).json({ success: false, error: "user not found." });
  const reply = `Username ${deletedUser.username} with ID ${deletedUser._id} deleted`;
  res.status(200).json({ success: true, message: reply });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  updateUserAddress,
  deleteUser,
  getOneUser,
  updateUserProfileCtrl,
};
