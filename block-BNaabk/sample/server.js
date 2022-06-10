const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("I am learning express now");
});

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});
