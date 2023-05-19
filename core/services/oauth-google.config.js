const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const AppConfig = require("../config/site.config.json");
//
module.exports = {
  passport,
  Oauth: new GoogleStrategy(
    {
      clientID: AppConfig.GOOGLE_CLIENT_ID,
      clientSecret: AppConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: AppConfig.GOOGLE_CALLBACK,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        users = {
          accessToken,
          refreshToken,
          profileInfo: profile._json,
        };
        // write your own code function to save the user in the database

        console.log(users);
        return done(null, users);
      } catch (error) {
        return done(error, false);
      }
    }
  ),
};
