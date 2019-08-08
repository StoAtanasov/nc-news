const commentsRouter = require("express").Router();
const {
  sendUpdateComment,
  removeComment
} = require("../controllers/comments-controller");
const { invalidMethods } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(sendUpdateComment)
  .delete(removeComment)
  .all(invalidMethods);


module.exports = commentsRouter;