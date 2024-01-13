const router = require("express").Router();
const usersController = require("../controllers/userController");
const { validate } = require("../middlewares/validate");
const {
  createNewUserSchema,
  updateUserSchema,
  updateUserProfile,
} = require("../validation/userValidation");
const { authenticate, authorizeAdmin } = require("../middlewares/authenticate");
const { upload } = require("../middlewares/multer");

router
  .route("/")
  .all(authorizeAdmin)
  .get(usersController.getAllUsers)
router.get("/:id",authenticate, usersController.getOneUser)
router.patch('/update-user-address' ,authenticate,usersController.updateUserAddress)
router.patch("/update-user-profile", authenticate, upload.single("image") , validate(updateUserProfile),usersController.updateUserProfileCtrl);
router.delete("/delete-by-admin/:id", authorizeAdmin, usersController.deleteUser);
router.patch("/update-by-admin/:id", authorizeAdmin, usersController.updateUser);
router.post("/create-by-admin",validate(createNewUserSchema), usersController.createNewUser)
module.exports = router;
