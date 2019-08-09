const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");
const {handlePSQLErrors, handleCustomErrors, handle500} = require("./errors")
app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", ( req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handle500);

module.exports = app;