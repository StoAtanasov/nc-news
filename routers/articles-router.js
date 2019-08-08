const articlesRouter = require("express").Router();
const {
  sendArticleById,
  updateArticle,
  sendAllArticles
} = require("../controllers/articles-controller");

const {
  sendNewArticleComment,
  sendAllCommentsByArticle
} = require("../controllers/comments-controller");
const { invalidMethods } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticle)
  .all(invalidMethods);

articlesRouter
  .route("/:article_id/comments")
  .post(sendNewArticleComment)
  .get(sendAllCommentsByArticle)
  .all(invalidMethods);

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(invalidMethods);

module.exports = articlesRouter;
