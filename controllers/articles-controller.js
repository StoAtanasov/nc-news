const {
  selectArticleById,
  selectUpdatedArticle,
  selectAllArticles
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
  console.log(req.query);
  const {sort_by, order} = req.query;
  selectAllArticles(sort_by, order)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(err => {
      next(err);
    });
};
