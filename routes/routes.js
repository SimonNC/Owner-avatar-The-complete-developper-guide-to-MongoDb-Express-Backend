const driversController = require("../controller/drivers_controller");

/**
 * Exports a function that configures API routes for a drivers API.
 *
 * @param {Object} app - Express app instance
 */
module.exports = app => {
  app.get("/api", driversController.greeting);
  //Create route to create a driver
  app.post("/api/drivers", driversController.create);

  //Route to update a driver
  app.put("/api/drivers/:id", driversController.edit);

  app.delete("/api/drivers/:id", driversController.delete);
};
