const connection = require("../db/connection");

exports.selectAllArticles = (sort_by = "created_at", order = "desc") => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.topic",
      "articles.article_id",
      "articles.created_at",
      "articles.votes"
    )
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.article_id AS comment_count ")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .then(articles => {
      if (!articles || articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Page not found" });
      } else return articles;
    });
};

exports.selectArticleById = article_id => {
  return connection
    .first("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.article_id AS comment_count ")
    .groupBy("articles.article_id")
    .where("articles.article_id", article_id)
    .then((article) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Page not found" });
      } else return article;
    });
};

exports.selectUpdatedArticle = (article_id, inc_votes = 0) => {
  return connection
    .increment("votes", inc_votes)
    .into("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .returning("*")
    .then(([article]) => {
      // destructure array
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else return article;
    });
};
