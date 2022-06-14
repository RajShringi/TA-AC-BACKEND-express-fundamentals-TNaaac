const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/users", (req, res) => {
  res.send("Users Page");
});

app.get("/projects", (req, res) => {
  res.sendFile(__dirname + "/projects.html");
});

// Error Middleware
app.use((req, res, next) => {
  res.send("Page Not Found");
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(4000, () => {
  console.log("port is listening on port 4k");
});
