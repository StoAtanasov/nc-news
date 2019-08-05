const apiRouter = require("express").Router();
const endPoints = require("../endpoints.json");
const topicsRouter = require("../routers/topics-router");
const usersRouter = require("./users-router");

apiRouter.route("/").get((req,res) => res.status(200).send(endPoints));
apiRouter.use("/topics",topicsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;