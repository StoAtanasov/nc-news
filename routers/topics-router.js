const topicsRouter = require("express").Router();
const sendTopics = require("../controllers/sendTopics");

topicsRouter.route("/").get(sendTopics)

module.exports = topicsRouter;