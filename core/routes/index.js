const express = require("express");
const router = express.Router();
const GoogleAuthPassportJs = require("./api/oauth2");
const CustomGoogleAuth = require("./api/custom-oauth2");
/*
GoogleAuth With PassportJS Routes
*/
router.use("/api/v1", GoogleAuthPassportJs);
router.get("/auth/google/success", (req, res) => {
  return res
    .send({
      success: true,
      message: "Google Authentication Done",
    })
    .end();
});
// error route if user is authenticated

router.get("/error", (req, res) => {
  return res
    .send({
      success: false,
      message: "Google Authentication Failed",
    })
    .end();
});
/*
GoogleAuth Without 3rd PatyLibray  Routes
*/
router.use("/custom", CustomGoogleAuth);

module.exports = router;
