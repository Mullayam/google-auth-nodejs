const express = require("express");
const router = express.Router();
const session = require("express-session");
const { passport, Oauth } = require("../../services/oauth-google.config");

passport.use(Oauth); 
router.use(passport.initialize());
 router.use(
   session({
     secret: "this_is_a_secret",
     rolling: true, // forces resetting of max age
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
   })
 );
// Google Authentication Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/error",
    successRedirect: "/auth/google/success",
  }),
  function (req, res) {
    //send jwt token
    res.redirect("/auth/google/success");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
});
//handlerd

module.exports = router;
