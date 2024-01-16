const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://127.0.0.1:27017/muber");
}

const app = express();

app.use(bodyParser.json());

routes(app);

module.exports = app;
