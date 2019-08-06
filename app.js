const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err,req,res,next) => {
  
  res.status(404).send({msg : err.msg})
})

app.use((err, req, res, next) => {
  console.log(err);


module.exports = app;