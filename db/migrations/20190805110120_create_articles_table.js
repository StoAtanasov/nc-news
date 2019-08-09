const connection = require("../connection");

exports.up = function(connection, Promise) {
  return connection.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .notNullable();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable()
      .onDelete("CASCADE");
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable()
      .onDelete("CASCADE");
    articlesTable.timestamp("created_at").defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable("articles");
};
