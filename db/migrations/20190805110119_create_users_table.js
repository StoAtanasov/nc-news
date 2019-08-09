const connection = require("../connection");

exports.up = function(connection, Promise) {
  return connection.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .primary()
      .notNullable()
      .unique();
    usersTable.string("avatar_url");
    usersTable.string("name").notNullable();
  });
};


exports.down = function(connection, Promise) {
  return connection.schema.dropTable("users");
};
