const usersRouter = require("express").Router();
const {sendUserByUsername} = require("../controllers/users-contorller");
const { invalidMethods } = require("../errors");

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all(invalidMethods);

module.exports = usersRouter;
