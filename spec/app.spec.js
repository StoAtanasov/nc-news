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
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an("object");
          });
      });
      describe("/topics", () => {
        it("GET  / status: 200, returns an array of topics objects", () => {
          return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({body})=> {
            expect(body.topics).to.be.an("array");
          })
        });
      });
    });
  });
});