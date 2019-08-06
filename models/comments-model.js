const connection = require("../db/connection");

exports.createCommentByArticle = (article_id, username, comment) => {
  return connection
    .insert({
      author: username,
      article_id: article_id,
      votes: 0,
      body: comment
    })
    .into("comments")
    .returning("*")
    .then(comment => {
      if (!comment || !comment.length) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      } else return comment[0];
    });
  };

  exports.selectAllComments = (
    article_id,
    sort_by = "created_at",
    order = "desc"
  ) => {
    console.log(order);
    return connection
      .select("comments.*")
      .from("comments")
      .orderBy(sort_by, order)
      .where("comments.article_id", article_id);
  };