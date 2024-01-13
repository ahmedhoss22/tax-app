const mongoose = require("mongoose");
const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    serial_code: {
      type: String,
    },
    user: {
      type: String,
      enum: ["User", "Tax"],
    },
    status: {
      type: String,
      enum: ["completed", "not_completed"],
      default: "not_completed",
    },
    admin:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
  },
  { timestamps: true }
);
const serviceModule = mongoose.model("Service", serviceSchema);
module.exports = serviceModule;
