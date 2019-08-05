const articlesRouter = require("express").Router();
const {sendArticleById} = require("../controllers/articles-controller")

articlesRouter.route("/:article_id").get(sendArticleById)

module.exports = articlesRouter;
