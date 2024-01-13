const {
  getChatMessages,
  postChatMessage,
  getAllAdminChats,
} = require("../controllers/messagesController");
const { authenticate, authorizeAdmin } = require("../middlewares/authenticate");

const router = require("express").Router();
router.get("/chat",authorizeAdmin,getAllAdminChats)
router.route("/:user/:admin/:service").all(authenticate).get(getChatMessages).post(postChatMessage)
module.exports = router;
