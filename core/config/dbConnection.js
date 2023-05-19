const sinfoConfig = require("./site.config.json");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose.connect(sinfoConfig.DB_URL);
const connect = mongoose.connection;

connect.on("connected", () => {
  console.log("DB connection established");
});
connect.on("error", () => {
  console.log("DB connection failed");
});
module.exports = connect;
