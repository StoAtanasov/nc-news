const connection = require("../db/connection");

exports.selectUser = username => {
  return connection
    .first("*")
    .from("users")
    .where("username", username);
};