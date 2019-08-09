const commentsRouter = require("express").Router();
const {
  sendUpdateComment,
  removeComment
} = require("../controllers/comments-controller");
const { handleInvalidMethods } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(sendUpdateComment)
  .delete(removeComment)
  .all(handleInvalidMethods);


module.exports = commentsRouter;