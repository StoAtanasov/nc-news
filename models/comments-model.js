const connection = require("../db/connection");
const { selectArticleById } = require("./articles-model");

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

exports.selectAllCommentsByArticle = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  const permittedColunms = [
    "comment_id",
    "author",
    "article_id",
    "votes",
    "created_at",
    "body"
  ];

  const permittedOrders = ["asc", "desc"];

  if (!permittedColunms.includes(sort_by) || !permittedOrders.includes(order)) {
    sort_by = "created_at";
    order = "desc";
  }

  return connection
    .select("comments.*")
    .from("comments")
    .orderBy(sort_by, order)
    .where("comments.article_id", "=", article_id)
    .then(comments => {
      if (!comments.length) {
        return selectArticleById(article_id).then(article => {
          if (article) {
            return [];
          } else {
            return Promise.reject({ status: 404, msg: "Not found" });
          }
        });
      } else return comments;
    });
};

exports.addCommentVote = (id, inc_votes) => {
  if (isNaN(inc_votes)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  } else {
    return connection
      .first("*")
      .from("comments")
      .where("comment_id", id)
      .increment("votes", inc_votes)
      .returning("*")
      .then(([comment]) => {
        if (!comment) {
          return Promise.reject({status:404, msg: "Invalid comment"})
        } else return comment;
      });
  }
};

exports.deleteComment = (id) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", id)
    .del()
    .then(deleted => {
      if (!deleted){
        return Promise.reject({
          status: 404,
          msg: "Comment does not exist"
        });
      }
    });
}