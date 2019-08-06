const connetion = require("../db/connection");

exports.selectArticleById = article_id => {
  
   return connetion
      .first("articles.*")
      .from("articles")
      .where("articles.article_id", article_id)
      .then(article => {
        if (!article.length) {
          return Promise.reject({ status: 404, msg: "Page not found" });
        } else return article;
      });
};

exports.selectUpdatedArticle = (article_id, inc_votes) => {
  return connetion
    .increment("votes", inc_votes)
    .into("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .returning("*");
    
    
};