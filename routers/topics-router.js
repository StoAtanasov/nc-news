const topicsRouter = require("express").Router();
const {sendTopics} = require("../controllers/topics-controller");
const { handleInvalidMethods } = require("../errors");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(handleInvalidMethods);



module.exports = topicsRouter;