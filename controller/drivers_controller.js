const Driver = require("../models/driver");
module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },
  create(req, res) {
    console.log(req.body);
    Driver.create(req.body)
      .then(driver => {
        res.send(driver);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};
