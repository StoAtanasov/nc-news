const connection = require("knex");
const dbconfig = require("../knexfile");

module.exports = connection(dbconfig);
