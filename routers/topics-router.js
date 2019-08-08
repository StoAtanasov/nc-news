const topicsRouter = require("express").Router();
const {sendTopics} = require("../controllers/topics-controller");
const {invalidMethods} = require("../errors");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(invalidMethods);



module.exports = topicsRouter;