const commentsRouter = require("express").Router();
const {
  sendUpdateComment,
  removeComment
} = require("../controllers/comments-controller");

commentsRouter.route("/:comment_id").patch(sendUpdateComment).delete(removeComment);


module.exports = commentsRouter;