const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use("/api", apiRouter);

module.exports = app;