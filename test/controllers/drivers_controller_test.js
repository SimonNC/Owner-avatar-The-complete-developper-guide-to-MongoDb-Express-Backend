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

/**
 * Tests for the drivers controller API.
 *
 * Includes tests for:
 *
 * - Creating a new driver via POST
 * - Updating a driver via PUT
 * - Deleting a driver via DELETE
 */
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
  it("PUT to /api/drivers/:id updates a driver", done => {
    Driver.create({ email: "test@test.com", driving: false }).then(driver => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ email: "test@test.com", driving: true })
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          Driver.findById(driver._id).then(driver => {
            assert.equal(driver.driving, true);
            done();
          });
        });
    });
  });
  it("DELETE to /api/drivers/:id deletes a driver", done => {
    Driver.create({ email: "test@test.com", driving: false }).then(driver => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          Driver.findById(driver._id).then(driver => {
            assert.equal(driver, null);
            done();
          });
        });
    });
  });
  it("Get to /api/drivers finds drivers in a location", done => {
    //Create two drivers with different location with one located outside of the 200 kilometers radius
    // Test that the drivers returned are the drivers within the radius
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] },
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });
    Promise.all([seattleDriver.save(), miamiDriver.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, res) => {
          console.log(res);
          if (err) return done(err);
          assert.equal(res.body.length, 1);
          assert.equal(res.body[0].email, "miami@test.com");
          done();
        });
    });
  });
});
