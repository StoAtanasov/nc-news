const { selectUser } = require("../models/users-model");

exports.sendUserByUsername = (req, res, next) => {
  const { username } = req.params;
 
  selectUser(username)
    .then(user => res.status(200).send({ user }))
    .catch(err => {
      next(err);
    });
};