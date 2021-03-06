const apiRouter = require("express").Router();
const endPoints = require("../endpoints.json");
const topicsRouter = require("../routers/topics-router");
const usersRouter = require("./users-router");
const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const { handleInvalidMethods } = require("../errors");

apiRouter
  .route("/")
  .get((req, res) => res.status(200).send(endPoints))
  .all(handleInvalidMethods);
apiRouter.use("/topics",topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter)

module.exports = apiRouter;