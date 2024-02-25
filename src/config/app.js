const express = require("express");
const app = express();
const path = require("path");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
// const rateLimit = require('express-rate-limit');
const routes = require("../routes");

const cookieParser = require("cookie-parser");
const {
  corsOptions,
  mongoSanitizeOptions,
  helmetOptions,
  rateLimitOptions,
} = require("./options");
function requestTime(req, res, next) {
  const startTime = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  next();
}

const passport = require("passport");
const session = require("express-session");
const { googlePassportStrategy } = require("../config/googlePssportStrategy");

app.use(
  session({
    secret: "Bodaaaaaaaaaaaaa",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
googlePassportStrategy(passport);


/** Some middlewares *  */
app.use(requestTime);
app.use(cookieParser());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(xss());
app.use(cors(corsOptions));
app.use(mongoSanitize(mongoSanitizeOptions));
// app.use(helmet(helmetOptions));
// app.use(rateLimit(rateLimitOptions));

/**
 * send request to register endpoint example
 * Method Post "/tax/v.1/auth/register"
 */

app.use("/tax/v1", routes);

// to serve the images ,make them accessible by client
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/** for not founded Routes */
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route Not Found" });
});

module.exports = app;
