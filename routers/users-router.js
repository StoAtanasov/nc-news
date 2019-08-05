const usersRouter = require("express").Router();
const {sendUserByUsername} = require("../controllers/users-contorller");

usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
