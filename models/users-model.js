const connection = require("../db/connection");

exports.selectUser = username => {
  return connection
    .first("*")
    .from("users")
    .where("users.username", "=", username)
    .then(user => {
      if(!user){
        return Promise.reject({status: 404, msg: "Username does not exists"})
      } else return user;
    });
};