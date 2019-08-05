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
          
          /* 
          
          Your article data is currently in the incorrect format and will violate your SQL schema. 
          
          You will need to write and test the provided formatDate utility function to be able insert your article data.
      
          Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
          */
        })




      
    })
    .then(articleRows => {
       
    
        const articleRef = makeRefObj(articleRows);
        const formattedComments = formatComments(commentData, articleRef);
        return connection('comments').insert(formattedComments);
      });
    };



