const connection = require("../db/connection");

exports.selectAllArticles = (sort_by = "created_at", order = "desc", author, topic) => {
  const permittedColumns = [
    "author",
    "title",
    "topic",
    "article_id",
    "created_at",
    "votes",
    "comment_count"
  ];

  const permittedOrders = ["asc", "desc"];

  if(!permittedColumns.includes(sort_by) || !permittedOrders.includes(order)){
    sort_by = "created_at";
    order = "desc";
  }
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
    .modify(function(queryBuilder) {
      if (author) {
        queryBuilder.where('articles.author', author);
      }
      if (topic) {
        queryBuilder.where('articles.topic', topic);
      }
    })
    .then(article => {
      if (!article || !article.length) {
        return Promise.reject({
          status: 404,
          msg: "Page not found"
        });
      } else return article;
    });
    ;
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

exports.patchArticle = (article_id, inc_votes = 0) => {
  return connection
    .increment("votes", inc_votes)
    .into("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else return article;
    });
  };
