const { registrationCtrl, loginCtrl, getCurrentUserCtrl, logOut } = require("../controllers/authController")
const { authenticate } = require("../middlewares/authenticate")
const { validate } = require("../middlewares/validate")
const { registrationSchema, loginUserSchema } = require("../validation/authValidation")
const router = require("express").Router()
const passport = require("passport")
const jwt = require("jsonwebtoken");

router.post('/register', validate(registrationSchema), registrationCtrl)
router.post('/login', validate(loginUserSchema), loginCtrl) 
router.post('/current-user', authenticate,getCurrentUserCtrl) 
router.post('/logout', authenticate,logOut) 
router.get("/google/error", (req, res) => {
    res.loginFailed({ message: "Login Failed" });
  });
  const CLIENT_URL = process.env.CLIENT_URL;
  router.get(
    "/google/signin",
    passport.authenticate("google", {
      successRedirect: "http://localhost:5173/",
      failureRedirect: "/google/error",
      scope: ["profile", "email"],
    })
  );
  
  router.get("/google/success", (req, res) => {
    createSendToken(req.user, 200, res);
  });
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      const signToken = (id) =>
        jwt.sign({ _id: id }, process.env.JWT_SECRET_TOKEN, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
      const token = signToken(req.user._id);
      const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      }; 
      res.cookie("jwt", token, cookieOptions);
      res.redirect(`${CLIENT_URL}`);
    }
  ); 

module.exports = router