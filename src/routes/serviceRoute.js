const router = require("express").Router();
const servicesController = require("../controllers/serviceController");
const { authenticate, authorizeAdmin } = require("../middlewares/authenticate");
const { upload } = require("../middlewares/multer");
const { validate } = require("../middlewares/validate");
const { serviceSchema } = require("../validation/serviceValidation");
router.get("/get-all",authenticate,servicesController.getServices)
// router
//   .route("/")
//   .get(authenticate, )
  
 router.post('/create',
    authorizeAdmin,
    upload.single("image"),
    validate(serviceSchema),
    servicesController.createService
  );

router
  .route("/:id")
  .get(authenticate, servicesController.getOneService)
  .patch(authorizeAdmin, upload.single("image"), servicesController.updateService)
  .delete(authorizeAdmin, servicesController.deleteService);

module.exports = router;
