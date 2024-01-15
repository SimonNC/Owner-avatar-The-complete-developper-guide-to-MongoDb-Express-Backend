const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("The express app", () => {
  it("handles a GET request to /api", done => {
    request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.hi, "there");
        done();
      });
  });
});
