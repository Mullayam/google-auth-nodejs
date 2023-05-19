const express = require("express");
const router = express.Router();
const GoogleAuth = require("../../controllers/GoogleAuthController"); 
 
// Google Authentication Routes
router.get("/auth/google",GoogleAuth.RedirectHandler );
router.get("/oauth/google/callback", GoogleAuth.CallbackHandler);
 

module.exports = router;
