/**
 * Tests the drivers controller by making a POST request
 * to /api/drivers to create a new driver, and asserting
 * the driver's count is increase by one after the request.
 */
const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Driver = mongoose.model("driver");

describe("Drivers controller", () => {
  it("creates a new driver", done => {
    Driver.countDocuments({}).then(count => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          Driver.countDocuments().then(newCount => {
            assert.equal(count + 1, newCount);
            done();
          });
        });
    });
  });
});
