const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../index");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(connection) {
  return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      const topicsInsertions = connection("topics")
        .insert(topicData)
        .returning("*");
      const usersInsertions = connection("users")
        .insert(userData)
        .returning("*");

      return Promise.all([topicsInsertions, usersInsertions]).then(() => {
        const formatedArticleDate = formatDates(articleData);
        return connection("articles")
          .insert(formatedArticleDate)
          .returning("*");
      });
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return connection("comments")
      .insert(formattedComments)
      .returning("*");
    });
};
