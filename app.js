const express = require("express");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err,req,res,next) => {
  //console.log(err, "<<<<< ERROR APP")

 if(err.code === "22P02"){
   res.status(400).send({ msg: "Bad request" });;
}else if(err.status){
  res.status(err.status).send({ msg: err.msg });
}else next(err)
})

app.all("/*", ( req, res, next) => {
  res.status(404).send({ msg: "Page not found" });
});
module.exports = app;