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
    it("GET  / status: 404 , response with message page not found, when passed wrong route", () => {
      return request(app)
        .get("/not-a-route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Page not found");
        });
    });
    it("GET  / status: 404 , response with message page not found, when passed wrong route", () => {
      return request(app)
        .get("/api/not-a-route")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Page not found");
        });
    });
    it("GET / status: 200, returns a JSON body with all endpoints", () => {
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
      it("GET  / status: 404 , response with message page not found, when passed wrong route", () => {
        return request(app)
          .get("/api/not-a-route")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Page not found");
          });
      });
    });
    describe("/users", () => {
      describe("/:username", () => {
        it("GET / status: 200, returns an user by his username", () => {
          return request(app)
            .get("/api/users/butter_bridge")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an("object");
              expect(body.user).to.have.keys("username", "avatar_url", "name");
              expect(body.user.username).to.equal("butter_bridge");
            });
        });
        it("GET / status: 404, for non existing  username", () => {
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
      it("GET / status: 200, returns all articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("Array");
            expect(body.articles[0]).to.be.an("Object");
            expect(body.articles[0]).to.have.keys(
              `author`,
              `title`,
              `article_id`,
              `topic`,
              `created_at`,
              `votes`,
              `comment_count`
            );
          });
      });
      it("GET / status: 404, returns Page not found", () => {
        return request(app)
          .get("/api/not-a-route")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Page not found");
          });
      });
      it("GET / status: 200, returns all articles , sorted in descending ctreated_at order by default", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET / status: 200, returns all articles , sorted by title order", () => {
        return request(app)
          .get("/api/articles?sort_by=title")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("title", {
              descending: true
            });
          });
      });
      it("GET / status: 200, returns all articles , sorted by default  in ascending order ", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: false
            });
          });
      });
      it("GET / status: 200, returns all articles , sorted by valid query and ordered by given order ", () => {
        return request(app)
          .get("/api/articles?sort_by=title&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("title", {
              descending: false
            });
          });
      });
      it("GET / status:200, ignore erroneous sort_by queries", () => {
        return request(app)
          .get("/api/articles?sort_by=invalid-query")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET / status:200, ignore erroneous order queries", () => {
        return request(app)
          .get("/api/articles?order=invalid-order")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET / status:200, ignore erroneous sorted_by and order queries", () => {
        return request(app)
          .get("/api/articles?sort_by=invalid-query&order=invalid-order")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET / status: 200, returns all articles, filtered by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.sortedBy("author", {
              descending: true
            });
          });
      });
      it("GET / status: 200, returns all articles, filtered by topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.sortedBy("topic", {
              descending: true
            });
          });
      });
      it("GET / status: 200, returns an array of article objects, with queries sort by created_at-ascending order and filtered by author", () => {
        return request(app)
          .get(
            "/api/articles?sort_by=created_at&order=asc&author=butter_bridge"
          )
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array");
            expect(body.articles[0].author).to.equal("butter_bridge");
            expect(body.articles[1].author).to.equal("butter_bridge");
            expect(body.articles[2].author).to.equal("butter_bridge");
            expect(body.articles).to.be.ascendingBy("created_at");
          });
      });
      it("GET / status: 200, returns an array of article objects, accept queries sort by body-descending order and filter by topic", () => {
        return request(app)
          .get("/api/articles?sort_by=created_at&order=desc&topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.an("array");
            expect(body.articles[0].topic).to.equal("mitch");
            expect(body.articles[1].topic).to.equal("mitch");
            expect(body.articles[2].topic).to.equal("mitch");
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("GET / status: 404, returns an error if  invalid author", () => {
        return request(app)
          .get("/api/articles?author=invalid")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Author not found");
          });
      });
      it("GET / status: 404, returns an error if  invalid topic", () => {
        return request(app)
          .get("/api/articles?topic=invalid")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Topic not found");
          });
      });
      describe("/:article_id", () => {
        it("GET / status: 404, for non existing  article id", () => {
          return request(app)
            .get("/api/articles/1000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Page not found");
            });
        });
        it("GET / status: 400, for invalid article", () => {
          return request(app)
            .get("/api/articles/not-a-number")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("GET / status: 200, returns the article by article id ", () => {
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
        it("PATCH / status: 201, returns an updated article", () => {
          return (
            request(app)
              .patch("/api/articles/1")
              .send({ inc_votes: 1 })
              .expect(201)
              .then(({ body }) => {
                expect(body.article).to.contain.keys(
                  "article_id",
                  "title",
                  "body",
                  "votes",
                  "topic",
                  "author",
                  "created_at"
                );
                expect(body.article.votes).to.equal(101);
              })
          );
        });
        it("PATCH / status: 201, returns the same article when an empty object is passed", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({})
            .expect(201)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                "article_id",
                "title",
                "body",
                "votes",
                "topic",
                "author",
                "created_at"
              );
              expect(body.article.votes).to.equal(100);
            });
        });
        it("PATCH / status: 400, when an invalid articile id is passed ", () => {
          return request(app)
            .patch("/api/articles/not-an-article")
            .send({ inc_votes: 1 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("PATCH / status: 404, patching article with valid id  that does not exists ", () => {
          return request(app)
            .patch("/api/articles/100000")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Article not found");
            });
        });
        it("PATCH / status: 400, when the value of the vote is an invalid format ", () => {
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
              expect(body.article.votes).to.equal(60);
            });
        });
        describe.only("/comments", () => {
          it("POST / status: 201, returns an object with the username and the new comment", () => {
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
          it("POST / status: 400, returns when an invalid articile id is passed  ", () => {
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
          it("POST / status: 422, returns when an valid article id  that does not exists is passed ", () => {
            return request(app)
              .post("/api/articles/10000/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(422)
              .then(({ body }) => {
                expect(body.msg).to.equal("Unproc­essable Entity");
              });
          });
          it("POST / status: 422, returns when passed invalid username but with comment to post", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "invalid username",
                body: "---> This is a new comment <---"
              })
              .expect(422)
              .then(({ body }) => {
                expect(body.msg).to.equal("Unproc­essable Entity");
              });
          });
          it("POST / status: 422, returns an error if a non-existent article_id is used", () => {
            return request(app)
              .post("/api/articles/100000/comments")
              .send({
                username: "butter_bridge",
                body: "---> This is a new comment <---"
              })
              .expect(422)
              .then(({ body }) => {
                expect(body.msg).to.equal("Unproc­essable Entity");
              });
          });
          it("GET / status: 200, returns all comments for given article_id", () => {
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
                expect(body.comments[1].article_id).to.equal(1);
              });
          });
          it("GET / status: 200, returns all comments for given article_id, comments are sorted in descending ctreated_at order by default", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("GET / status: 200, returns all comments for given article_id, comments are sorted by author ", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=author")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("author", {
                  descending: true
                });
                expect(body.comments[0].author).to.equal("icellusedkars");
              });
          });
          it("GET / status: 200, returns all comments for given article_id, comments are sorted by created_at and ordered by given order", () => {
            return request(app)
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: false
                });
              });
          });
          it("GET / status: 200, returns all comments for given article_id, comments are sorted by valid query and ordered by given order", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=author&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("author", {
                  descending: false
                });
                expect(body.comments[0].author).to.equal("butter_bridge");
              });
          });
          it("GET / status: 400, returns when an invalid articile id used and valid query passed passed  ", () => {
            return request(app)
              .get(
                "/api/articles/not-an-article/comments?sort_by=author&order=asc"
              )
              .expect(400)
              .then(({ body }) => {
                expect(body.msg).to.equal("Bad request");
              });
          });
          it("GET / status: 404, returns an error if a non-existent article_id is used and valid query passed", () => {
            return request(app)
              .get("/api/articles/100000/comments?sort_by=author&order=asc")
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).to.equal("Page not found");
              });
          });
          it("GET / status:200 ignore erroneous sort_by queries passed", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=wrong_query")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("GET / status:200 ignore erroneous order queries", () => {
            return request(app)
              .get("/api/articles/1/comments?order=wrong_query")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("GET / status:200 ignore erroneous sort_by and order queries", () => {
            return request(app)
              .get("/api/articles/1/comments?order=wrong_query")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("created_at", {
                  descending: true
                });
              });
          });
          it("GET / status:200 , returns an empty array when an article without any comments passed", () => {
            return request(app)
              .get("/api/articles/11/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.eql([]);
              });
          });
        });
      });
    });
    describe("/comments", () => {
      describe("/:comment_id", () => {
        it("PATCH / status: 200, patching comment, increasing votes with one vote", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(17);
            });
        });
        it("PATCH / status: 200, patching comment, decreasing votes with one vote", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: -1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(15);
            });
        });
        it("PATCH / status: 200, ignores any additional element passed in through the body", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1, pet: "cat" })
            .expect(200)
            .then(({ body }) => {
              expect(body.comment.votes).to.equal(17);
            });
        });
        it("PATCH / status: 400, returns an error where no inc_votes value is provided", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({})
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("PATCH / status: 400, returns an error where an invalid inc_votes value is provided", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: "Invalid" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad request");
            });
        });
        it("PATCH / status: 404, returns an error when the comment id does not exists", () => {
          return request(app)
            .patch("/api/comments/10000")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Invalid comment");
            });
        });
        it("DELETE / status: 204, returns no content", () => {
          return request(app)
            .delete("/api/comments/2")
            .expect(204);
        });
        it("DELETE / status: 404, when deleting non existent comment", () => {
          return request(app)
            .delete("/api/comments/10000")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Comment does not exist");
            });
        });
      });
      it("DELETE / status: 400, when deleting invalid comment id", () => {
        return request(app)
          .delete("/api/comments/not-an-id")
          .expect(400)
          .then(({body}) =>{
            expect(body.msg).to.equal("Bad request");
          })
      });
    });
  });
});
