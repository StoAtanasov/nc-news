exports.handlePSQLErrors = (err,req,res, next) => {
  //console.log(err, "<<<<< handlePSQLErrors")
if (err.code === "23503") {
  res.status(422).send({ msg: "Unproc­essable Entity" });
} else if (err.code === "22P02") {
  res.status(400).send({ msg: "Bad request" });
} else next(err);

};

exports.handleCustomErrors = (err, req, res, next) => {
  //console.log(err, "<<<<< CustomErrors")
if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handle500 = (err,req,res, next) => {
//console.log(err, "<<<<< handle500")
};