const Driver = require("../models/driver");
module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById(driverId))
      .then(driver => {
        res.send(driver);
      })
      .catch(next);
  },
};
