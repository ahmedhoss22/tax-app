const { Schema, model } = require("mongoose");
const messageSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    userMessage: { type: String },
    adminMessage: { type: String },
  },
  {
    timestamps: true,
  }
);
const Message = model("Message", messageSchema);
module.exports = Message;
