const {
  createCommentByArticle,
  selectAllComments
} = require("../models/comments-model");

exports.sendNewArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  createCommentByArticle(article_id, username, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

exports.sendAllComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectAllComments(article_id, sort_by, order)
  .then(comments => {
    res.status(200).send({ comments });
  })
  .catch(err => {
    next(err)
  });
};
