const {createCommentByArticle} = require("../models/comments-model")
exports.sendNewArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const {username, body} = req.body;
createCommentByArticle(article_id, username,body)
.then(comment => {
  res.status(201).send({comment})
})
.catch(err => {
  next(err)
});
 
};