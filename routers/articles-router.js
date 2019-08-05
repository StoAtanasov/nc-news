const articlesRouter = require("express").Router();
const {
  sendArticleById,
  updateArticle
} = require("../controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(sendArticleById)
  .patch(updateArticle);

module.exports = articlesRouter;
