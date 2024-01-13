const asyncHandler = require("express-async-handler");
const Paper = require("../models/papersModel");
const papersController = {
  createPaper: asyncHandler(async (req, res) => {
    if (req.file && req.file.filename) {
      req.body.paper = `papers/${req.file.filename}`;
    }
    let newPaper = new Paper({ ...req.body });
    await newPaper.save();
    res.send({ data: newPaper });
  }),

  getPaper: asyncHandler(async (req, res) => {
    let paper = await Paper.findOne({ _id: req.params.id });
    res.send({ data: paper });
  }),
  getAllPapers: asyncHandler(async (req, res) => {
    let Papers = await Paper.find({});
    res.send({ data: Papers });
  }),

  updatePaper: asyncHandler(async (req, res, next) => {
    if (req.file && req.file.filename) {
      req.body.paper = `papers/${req.file.filename}`;
    }
    const { id } = req.params;
    const updatedItem = req.body;
    const document = await Paper.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    res.status(200).json({ data: document });
  }),

  deletePaper: asyncHandler(async (req, res) => {
    const deletedUser = await Paper.findOneAndDelete({ _id: req.params.id });
    if (!deletedUser)
      return res
        .status(404)
        .json({ success: false, error: "paper not found." });
    res.send({ success: true });
  }),
};

module.exports = papersController;
