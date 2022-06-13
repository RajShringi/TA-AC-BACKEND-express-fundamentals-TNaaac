const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Index page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.use("/admin", (req, res, next) => {
  next("Unauthorized");
});

app.use((req, res, next) => {
  res.send("Page not found");
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000, () => {
  console.log("port is listening on port 3k");
});
