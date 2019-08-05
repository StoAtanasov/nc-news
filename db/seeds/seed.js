const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');



const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(connection, Promise) {

 return connection.migrate
    .rollback()
    .then(() => connection.migrate.latest())
    .then(() => {
      const topicsInsertions = connection('topics').insert(topicData).returning("*");
      const usersInsertions = connection('users').insert(userData).returning("*");

      return Promise.all([topicsInsertions, usersInsertions])
        .then(() => {
          
         
        })




      
    })
    .then(articleRows => {
       
    
        const articleRef = makeRefObj(articleRows);
        const formattedComments = formatComments(commentData, articleRef);
        return connection('comments').insert(formattedComments);
      });
    };



