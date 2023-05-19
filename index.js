const express = require("express");
const cors = require("cors"); 
const SiteConfig = require("./core/config/site.config.json");
const app = require("./core/app");
require("./core/config/dbConnection");
const Origin =
  SiteConfig.APP_ENV === "production" ? SiteConfig.ALLOWED_DOMAINS : "*";
 
// check Api is working or not
app.get("/", function (req, res) {
  let message = "OK";
  let status = "online";
  if (SiteConfig.APP_ENV === "production") {
    if (SiteConfig.ALLOWED_DOMAINS.indexOf(req.headers.host) === -1) {
      message = "Access to This API has restricted";
      status = "offline";
    }
  }
  res.json({
    status,
    author: "ENJOYS - ENIGMA",
    github: "https://github.com/Mullayam/google-auth-nodejs",
    message,
  });
});

// set cors options 
const options = {
  origin: Origin,
  methods: "GET, PUT,POST, DELETE",
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "API_KEY",
    "Access-Control-Allow-Origin",
  ],
};

if (SiteConfig.APP_ENV === "production") {
  app.use(cors(options));
}

console.log("----- Starting -----");
// listening server
app.listen(8000, () => console.log("Server listening on 8000"));
