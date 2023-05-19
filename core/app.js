const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");

app.use(cookieParser());
app.use(express.json());

// Routes used for API
app.use(routes);

module.exports = app;
