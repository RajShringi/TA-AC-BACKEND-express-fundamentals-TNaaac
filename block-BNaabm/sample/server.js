const express = require("express");

const app = express();

function logger(req, res, next) {
  console.log(req.url, req.method);
  next();
}

app.use("/about", logger);

app.get("/", (req, res) => {
  res.send("I learned about middleware in this block");
});

app.listen(4000, () => {
  console.log("server is listening on port 4k");
});
