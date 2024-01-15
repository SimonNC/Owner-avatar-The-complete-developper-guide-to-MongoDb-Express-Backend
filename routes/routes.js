const driversController = require("../controller/drivers_controller");

module.exports = app => {
  app.get("/api", driversController.greeting);
  //Create route to create a driver
  app.post("/api/drivers", driversController.create);
};
