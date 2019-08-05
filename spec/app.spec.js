process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
const chai = require("chai");
chai.use(chaiSorted);
const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");

describe("app", () => {
  after(() => {
    return connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/*", () => {
    describe("/api", () => {
      it("GET / status:200, returns a body with all endpoints.", () => {
        return request(app)
        .get("/api")
        .status(200)
        .then(({body}) => {
          expect(body).to.be.an("object");
        })
      });
    });
  });
});