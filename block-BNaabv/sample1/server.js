const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let count = req.cookies.count;
  if (count) {
    res.cookie("count", Number(count) + 1);
  } else {
    res.cookie("count", 1);
  }
  next();
});

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.get("/", (req, res) => {
  res.send("<h2>Welcome to express</h2>");
});

app.get("/about", (req, res) => {
  res.send("My name is qwerty");
});

app.post("/form", (req, res) => {
  res.json(req.body);
});

app.post("/json", (req, res) => {
  res.json(req.body);
});

app.get("/users/:username", (req, res) => {
  const username = req.params.username;
  res.send(`<h1>${username}</h1?`);
});

app.use("/admin", (req, res, next) => {
  next("Unauthorized can not acess");
});

app.use((req, res, next) => {
  res.send("Page Not Found");
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});
