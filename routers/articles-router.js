const articlesRouter = require("express").Router();
const {
  sendArticleById,
  updateArticle,
  sendAllArticles
} = require("../controllers/articles-controller");

const {
  sendNewArticleComment,
  sendAllComments
} = require("../controllers/comments-controller");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticle);

articlesRouter.route("/:article_id/comments").post(sendNewArticleComment).get(sendAllComments);

articlesRouter.route("/").get(sendAllArticles);

module.exports = articlesRouter;
