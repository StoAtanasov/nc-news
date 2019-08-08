exports.handlePSQLErrors = (err, req, res, next) => {
  //console.log(err, "<<<<< handlePSQLErrors")
  const errCodes = {
    "23503": { status: 422, msg: "Unproc­essable Entity" },
    "22P02": { status: 400, msg: "Bad request" }
  };

  if (errCodes[err.code]) {
    res.status(errCodes[err.code].status).send({ msg: errCodes[err.code].msg });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  //console.log(err, "<<<<< CustomErrors")
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.invalidMethods = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log(err, "<<<<< handle500");
};
