const articlesRouter = require("express").Router();
const {
  sendArticleById,
  updateArticle
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
module.exports = articlesRouter;
