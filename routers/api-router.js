const apiRouter = require("express").Router();
const endPoints = require("../endpoints.json");
apiRouter.route("/").get((req,res) => res.status(200).send(endPoints))

module.exports = apiRouter;