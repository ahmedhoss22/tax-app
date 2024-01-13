const router = require("express").Router();
const contactController = require("../controllers/contactController");
const { validate } = require("../middlewares/validate");
const { contactSchema } = require("../validation/contactValidation");

// POST route for sending contact email
router.post(
  "/send",
  validate(contactSchema),
  contactController.sendContactEmail
);

module.exports = router;
