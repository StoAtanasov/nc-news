const connection = require("../connection");

exports.up = function(connection, Promise) {
  return connection.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title");
    articlesTable.text("body");
    articlesTable.integer("votes").defaultTo(0);
    articlesTable.string("topic").references("topics.slug");
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("articles");
};
