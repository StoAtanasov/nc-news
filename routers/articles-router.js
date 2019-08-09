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
const { handleInvalidMethods } = require("../errors");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticle)
  .all(handleInvalidMethods);

articlesRouter
  .route("/:article_id/comments")
  .post(sendNewArticleComment)
  .get(sendAllCommentsByArticle)
  .all(handleInvalidMethods);

articlesRouter
  .route("/")
  .get(sendAllArticles)
  .all(handleInvalidMethods);

module.exports = articlesRouter;
