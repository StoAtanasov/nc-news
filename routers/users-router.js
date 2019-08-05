const usersRouter = require("express").Router();
const sendUserByUsername = require("../controllers/users-contoller");

usersRouter.route("/:username").get(sendUserByUsername);

module.exports = usersRouter;
