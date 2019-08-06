const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err,req,res,next) => {
  
  res.status(404).send({msg : err.msg})
})

app.all("/*", ( req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});
module.exports = app;