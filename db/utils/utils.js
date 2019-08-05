exports.formatDates = list => {
  return list.map(arrayOfComments => {
    const commentArr = { ...arrayOfComments };
    const formatDate = new Date(arrayOfComments.created_at);
    commentArr.created_at = formatDate;
    return commentArr;
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
