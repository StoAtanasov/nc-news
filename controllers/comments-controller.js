const {
  createCommentByArticle,
  selectAllComents
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

exports.sendAllComments = (req,res,next) => {
  const {article_id} = req.params;
  console.log(article_id);
  selectAllComents(article_id)
  .then(comments => {
    res.status(200).send({comments})
  })
}
