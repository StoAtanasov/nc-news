const connection = require("../db/connection");

exports.selectArticleById = article_id => {
  
   return connection
     .first("articles.*")
     .from("articles")
     .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
     .count("comments.article_id AS comment_count ")
     .groupBy("articles.article_id")
     .where("articles.article_id", article_id)
     .then(article => {
       if (!article) {
         return Promise.reject({ status: 404, msg: "Page not found" });
       } else return article;
     });

};

exports.selectUpdatedArticle = (article_id, inc_votes) => {
  
  return connection
    .increment("votes", inc_votes)
    .into("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .returning("*")
    .then(article => {
      if (!article || !article.length) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else return article;
    });
    
    
};