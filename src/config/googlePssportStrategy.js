const User = require("../models/userModel");
const { createSendToken } = require("../utility/createSendToken");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const googlePassportStrategy = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ "ssoAuth.googleId": id });
    done(null, user);
  });
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/tax/v1/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let userObj = {
          ssoAuth: { googleId: profile.id },
          username: profile.displayName,
          email: profile.emails[0].value,
        };
        const existingUser = await User.findOne({email : userObj.email});
        console.log(existingUser);
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = new User(userObj);
        await user.save();
        return done(null, user);
      }
    )
  );
};
module.exports = { googlePassportStrategy };
