const {
  createCommentByArticle,
  selectAllCommentsByArticle,
  patchCommentVote,
  deleteComment
} = require("../models/comments-model");

exports.sendNewArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  createCommentByArticle(article_id, username, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.sendAllCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;

  selectAllCommentsByArticle(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.sendUpdateComment = (req, res, next) => {
  const {comment_id} = req.params;
  const {inc_votes} =  req.body;
  patchCommentVote(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const {comment_id} = req.params;
   deleteComment(comment_id)
     .then(comment => {
       res.sendStatus(204);
     })
     .catch(next);
}