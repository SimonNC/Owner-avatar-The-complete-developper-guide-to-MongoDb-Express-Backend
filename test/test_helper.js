const mongoose = require("mongoose");

before(done => {
  // connect to MongoDB
  mongoose.connect("mongodb://127.0.0.1:27017/muber-test", {
    useNewUrlParser: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("We are connected to test database!");
    done();
  });
});

beforeEach(done => {
  // clear the database
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
    });
});
