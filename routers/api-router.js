const apiRouter = require("express").Router();
const endPoints = require("../endpoints.json");
const topicsRouter = require("../routers/topics-router")

apiRouter.route("/").get((req,res) => res.status(200).send(endPoints));
apiRouter.use("/topics",topicsRouter);
module.exports = apiRouter;