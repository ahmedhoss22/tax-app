const { Schema, model } = require("mongoose");

const paperSchema = new Schema({
  paper: { type: String },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["valid", "not valid"],
  },
  category: {
    type: String,
  },
  company: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
},{
  timestamps:true
});

const Paper = model("Paper", paperSchema);
module.exports = Paper;
