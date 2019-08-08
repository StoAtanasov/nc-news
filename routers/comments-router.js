const commentsRouter = require("express").Router();
const {sendUpdateComment} = require("../controllers/comments-controller");

commentsRouter.route("/:comment_id").patch(sendUpdateComment);


module.exports = commentsRouter;