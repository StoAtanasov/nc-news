const connetion = require("../db/connection");

exports.selectArticleById = article_id => {
  return connetion
    .first("articles.*")
    .from("articles")
    .where("articles.article_id", article_id);
};