const {fetchTopics} = require("../models/topics-model")

exports.sendTopics = (req,res,next) => {
 
 fetchTopics()
 .then(topics => {
  res.status(200).send({topics});
 })
 .catch(err => next(err))
};