const ENV = process.env.NODE_ENV || "development";
const connection = require("knex");

const dbconfig =
  ENV === "production"
    ? { client: "pg", connection: process.env.DATABASE_URL }
    : require("../knexfile");


module.exports = connection(dbconfig);
