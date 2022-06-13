const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/about", (req, res, next) => {
  console.log(req.cookies);
  res.cookie("username", "Raj");
  next();
});

app.get("/about", (req, res) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});
