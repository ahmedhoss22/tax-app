const asyncHandler = require("express-async-handler");
const Service = require("../models/serviceModel");
const { generateSerialCode } = require("../utility/uniqueSerialCode");

const getServices = asyncHandler(async (req, res, next) => {
  const services = await Service.find({});
  res.status(201).json({ data: services });
});

const getOneService = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) {
    res.status(404).json({ error: `not service for this ${id}` });
  } else {
    res.status(201).json({ status: "Success", data: service });
  }
});

const createService = asyncHandler(async (req, res, next) => {
  if (req.file && req.file.filename) {
    req.body.img = `service/${req.file.filename}`;
  }
  console.log(req.body);
  let serialCode;
  let isUnique = false;
  while (!isUnique) {
    serialCode = await generateSerialCode();
    const existingService = await Service.findOne({ serial_code: serialCode });
    if (!existingService) {
      isUnique = true;
    }
  }
  req.body.serial_code = serialCode;
  const newService = new Service({ ...req.body, admin: req.user._id });
  await newService.save();
  res.status(201).json({ data: newService });
});
const updateService = asyncHandler(async (req, res, next) => {
  if (req.file && req.file.filename) {
    req.body.img = `service/${req.file.filename}`;
  }
  let service = await Service.findById(req.params.id);
  if (!service) {
    return res
      .status(404)
      .json({ status: "fail", error: `not service for this id ` });
  }
  const updatedService = await Service.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(201).json({ status: "success", data: { updatedService } });
});

const deleteService = asyncHandler(async (req, res, next) => {
  let service = await Service.findById(req.params.id);
  if (!service) {
    return res
      .status(404)
      .json({ status: "fail", error: `not service for this id ` });
  }
  const deletedService = await Service.deleteOne({ _id: req.params.id });
  res.json({ data: { delete: deletedService } });
});
module.exports = {
  getServices,
  getOneService,
  createService,
  updateService,
  deleteService,
};
