const { selectUser } = require("../models/users-model");

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
  console.log(username);
  selectUser(username);
};