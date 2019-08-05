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
      it("GET / status:200, returns a body with all endpoints", () => {
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
            expect(body.topics[0]).to.be.an("object");
            expect(body.topics[0]).to.have.keys("slug","description");
            
          })
        });
      });
      describe("/users", () => {
        describe("/:username", () => {
          it("GET / status:200, returns an user by his username", () => {
            return request(app)
              .get("/api/users/butter_bridge")
              .expect(200)
              .then(({ body }) => {
                expect(body.user).to.be.an("object");
                 expect(body.user).to.have.keys(
                   "username",
                   "avatar_url",
                   "name"
                 );
              });
          });
        });
      });
      describe("/articles", () => {
        describe("/:article_id", () => {
          it("GET / status:200, returns the article by article id ", () => {
            return request(app)
              .get("/api/articles/1")
              .expect(200)
              .then(({ body }) => {
                expect(body.article).to.have.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at"                
                );
              });
          });
          it('PATCH / status:200, returns an updated article', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({inc_votes: 1})
            .expect(201)
            .then(({body}) => {
              expect(body.article).to.contain.keys(
                'article_id',
                'title',
                'body',
                'votes',
                'topic',
                'author',
                'created_at'
              );
              expect(body.article.votes).to.equal(101);
            });
          });
        });
      });
    });
  });
});