const commentsRouter = require("express").Router();

commentsRouter("/:comment_id").patch(updateComment);


module.exports = commentsRouter;