const {
  selectArticleById,
  patchArticle,
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
  patchArticle(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.sendAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
   selectAllArticles(sort_by, order, author, topic)
     .then(articles => {
     res.status(200).send({ articles });
    })
     .catch(next);
};
