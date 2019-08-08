const {
  selectArticleById,
  selectUpdatedArticle,
  selectAllArticles,
  checkIfExists
} = require("../models/articles-model");

exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  selectUpdatedArticle(article_id, inc_votes)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.sendAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
   selectAllArticles(sort_by, order, author, topic)
    .then(articles => {
      const validAuthor = author
        ? checkIfExists(author, "users", "username")
        : null;
      const validTopic = topic
        ? checkIfExists(topic, "topics", "slug")
        : null;
      return Promise.all([validAuthor, validTopic, articles]);
    })
    .then(([validAuthor, validTopic, articles]) => {
      if (validAuthor === false){
        return Promise.reject({status:404, msg: "Author not found"})
      }else if( validTopic === false) {
        return Promise.reject({status:404, msg: "Topic not found"})
      }else {
          res.status(200).send({ articles });
      }
    })
    .catch(err => {
      next(err);
    });
};
