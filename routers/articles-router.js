const articlesRouter = require("express").Router();
const {
  sendArticleById,
  updateArticle
} = require("../controllers/articles-controller");

const {sendNewComment} = require("../controllers/comments-controller")
articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticle);

articlesRouter.route("/articles/:article_id/comment").post(sendNewComment);
module.exports = articlesRouter;
