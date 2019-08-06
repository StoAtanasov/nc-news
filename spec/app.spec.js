process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
const chai = require("chai");
chai.use(chaiSorted);
const request = require("supertest");
const connection = require("../db/connection");
const app = require("../app");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/api", () => {
    it("GET  / status:404 , response with message page not found, when passed wrong route", () => {
      return request(app)
        .get("/not-a-route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Page not found");
        });
    });
    it("GET  / status:404 , response with message page not found, when passed wrong route", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Page not found");
        });
    });
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
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.be.an("object");
            expect(body.topics[0]).to.have.keys("slug", "description");
          });
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
              expect(body.user).to.have.keys("username", "avatar_url", "name");
              expect(body.user.username).to.equal("butter_bridge");
            });
        });
        it("GET / status:404, for non existing  username", () => {
          return request(app)
            .get("/api/users/not-a-username")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Username does not exists");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        it("GET / status:404, for non existing  article id", () => {
          return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Page not found");
            });
        });
        it("GET / status:400, for invalid article", () => {
          return request(app)
            .get("/api/articles/not-a-number")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("GET / status:200, returns the article by article id ", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.have.keys(
                `author`,
                `title`,
                `article_id`,
                `body`,
                `topic`,
                `created_at`,
                `votes`,
                `comment_count`
              );
              expect(body.article.article_id).to.equal(1);
            });
        });
        it("PATCH / status:201, returns an updated article", () => {
          return (
            request(app)
              // create a test for .send({ }) return the same id witn nothing changed in it
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(201)
              .then(({ body }) => {
                expect(body.article[0]).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at"
                );
                expect(body.article[0].votes).to.equal(101);
              })
          );
        });
        it("PATCH / status:201, returns the same article when an empty object is passed", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(201)
            .then(({ body }) => {
              expect(body.article[0]).to.contain.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at"
              );
              expect(body.article[0].votes).to.equal(100);
            });
        });
        it("PATCH / status:400, when an invalid articile id is passed ", () => {
          return request(app)
            .patch("/api/articles/not-an-article")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("PATCH / status:404, patching article with valid id  that does not exists ", () => {
          return request(app)
            .patch("/api/articles/100000")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article not found");
            });
        });
        it("PATCH / returns status:400, when the value of the vote is an invalid format ", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: "not-a-number" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("PATCH / status: 201, ignores any extra item passed in the body", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: -40, pet: "cat" })
            .expect(201)
            .then(({ body }) => {
              expect(body.article[0].votes).to.equal(60);
            });
        });
        describe("/comments", () => {
          it("POST / status:201, returns an object with the username and the new comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment).to.be.an("object");
                expect(body.comment).to.have.keys(
                  `comment_id`,
                  `author`,
                  `article_id`,
                  `votes`,
                  `created_at`,
                  `body`
                );
                expect(body.comment.comment_id).to.equal(19);
                expect(body.comment.author).to.equal("butter_bridge");
                expect(body.comment.article_id).to.equal(1);
                expect(body.comment.votes).to.equal(0);
                expect(body.comment.body).to.equal(
                  "---> This is a new comment <---"
                );
              });
          });
          it("POST / status:400, returns when an invalid articile id is passed  ", () => {
            return request(app)
              .post("/api/articles/not-an-article/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request");
              });
          });
          it("POST / status:404, returns when an valid article id  that does not exists is passed ", () => {
            return request(app)
              .post("/api/articles/10000/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request");
              });
          });
          it("POST / status:404, returns when passed invalid username but with comment to post", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "invalid username",
                body: "---> This is a new comment <---"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request");
              });
          });
          it("POST / status: 404, returns an error if a non-existent article_id is used", () => {
            return request(app)
              .post("/api/articles/100000/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request");
              });
          }); 
          it.only("GET / status: 200, returns all comments for given article_id", () => {
                return request(app)
                  .get("/api/articles/1/comments")
                  .expect(200)
                  .then(({ body }) => {
                   expect(body.comments).to.be.an("array");
                    expect(body.comments[1]).to.have.keys(
                      `comment_id`,
                      `created_at`,
                      `author`,
                      `body`,
                      `votes`,
                      `article_id`
                    );
                    expect(body.comments[1].article_id).to.equal(1)
                  });
              });
          xit("GET / status: 200, displays all comments for specified article and comments are sorted by created_at (SORTED DESC BY DEFAULT)", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=author")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0].author).to.equal(
                  "icellusedkars"
                );
              });
          });

        });
      });
    });
  });
});
