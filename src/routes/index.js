const router = require("express").Router();

// route ,require(file path)
router.use("/auth", require("./authRoutes"));
router.use("/blog", require("./blogRoutes"));
router.use("/contact", require("./contactRoutes"));
router.use("/user", require("./userRoute"));
router.use("/papers", require("./papersRoutes"));
router.use("/services", require("./serviceRoute"));
router.use("/messages", require("./messagesRoutes"));

module.exports = router;
