const usersRouter = require("express").Router();
const {sendUserByUsername} = require("../controllers/users-contorller");
const { handleInvalidMethods } = require("../errors");

usersRouter
  .route("/:username")
  .get(sendUserByUsername)
  .all(handleInvalidMethods);

module.exports = usersRouter;
