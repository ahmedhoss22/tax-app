const { registrationCtrl, loginCtrl, getCurrentUserCtrl, logOut } = require("../controllers/authController")
const { authenticate } = require("../middlewares/authenticate")
const { validate } = require("../middlewares/validate")
const { registrationSchema, loginUserSchema } = require("../validation/authValidation")
const router = require("express").Router()
router.post('/register', validate(registrationSchema), registrationCtrl)
router.post('/login', validate(loginUserSchema), loginCtrl) 
router.post('/current-user', authenticate,getCurrentUserCtrl) 
router.post('/logout', authenticate,logOut) 
module.exports = router