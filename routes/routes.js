const driversController = require("../controller/driversController");

module.exports = app => {
  app.get("/api", driversController.greeting);
};
