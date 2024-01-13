const { default: mongoose } = require("mongoose");
const Message = require("../models/messageModel");
const asyncHandler = require("express-async-handler");
module.exports = {
 getAllAdminChats: asyncHandler(async (req, res) => {
    const { _id: adminId } = req.user;
    const services = await Message.find({ admin: adminId }).distinct('service').exec();

    const result = [];

    for (const service of services) {
      const serviceChats = await Message.find({ service })
        .populate("user", "email username role")
        .populate("admin", "email username role") 
        .populate("service", "title description status")
        .exec();

      const groupedMessages = serviceChats.reduce((acc, message) => {
        const { user, admin, service, userMessage, adminMessage, createdAt, updatedAt } = message;

        if (!acc[user._id]) {
          acc[user._id] = {
            user,
            admin,
            service,
            adminMessages: [],
            userMessages: [],
            firstMessageCreatedAt: createdAt,
            lastMessageUpdatedAt: createdAt,
          };
        }

        if (userMessage) {
          acc[user._id].userMessages.push({ message: userMessage, createdAt, updatedAt });
        } else if (adminMessage) {
          acc[user._id].adminMessages.push({ message: adminMessage, createdAt, updatedAt });
        }

        if (createdAt < acc[user._id].firstMessageCreatedAt) {
          acc[user._id].firstMessageCreatedAt = createdAt;
        }
        if (updatedAt > acc[user._id].lastMessageUpdatedAt) {
          acc[user._id].lastMessageUpdatedAt = updatedAt;
        }

        return acc;
      }, {});

      result.push(...Object.values(groupedMessages));
    }

    console.log(result);
    res.status(200).json({ data: result });
  }),
  
  getChatMessages: asyncHandler(async (req, res) => {
    const { user, admin, service } = req.params;
    const messages = await Message.find({
      $or: [
        { user, admin, service },
        { user: admin, admin: user, service },
      ],
    })
      .sort({ timestamp: 1 })
      .exec();
    res.status(200).json({ data: messages });
  }),

  postChatMessage: asyncHandler(async (req, res) => {
    const { admin, user, service } = req.params;
    const newMessage = new Message({
      user,
      admin,
      service,
    });
    if (req.user.role === "Admin") {
      newMessage.adminMessage = req.body.message;
    } else if (req.user.role === "User") {
      newMessage.userMessage = req.body.message;
    }
    await newMessage.save();
    res.status(201).json({ data: newMessage });
  }),
};
