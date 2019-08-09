exports.formatDates = list => {
  return list.map(element => {
    const newObj = { ...element };
    const formatDate = new Date(element.created_at);
    newObj.created_at = formatDate;
    return newObj;
  });
};

exports.makeRefObj = list => {
  return list.reduce((refObj, article) => {
    refObj[article.title] = article.article_id;
    return refObj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const author = comment.created_by;
    const article_id = articleRef[comment.belongs_to];
    const formatedDate = new Date(comment.created_at);
    const { belongs_to, created_by, ...restOfcomments } = comment;
    const formatedCom = {
      ...restOfcomments,
      author,
      article_id,
      created_at: formatedDate
    };
    return formatedCom;
  });
};
