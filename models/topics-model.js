const connection = require("../db/connection");

exports.fetchTopics = (topics) => {
return connection
.select("*")
.from("topics");
}