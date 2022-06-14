const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (store) {
      req.body = JSON.parse(store);
      next();
    }
    next();
  });
});

app.use((req, res, next) => {
  console.log(req.url, req.method, new Date().getTime());
  next();
});

app.use((req, res, next) => {
  const path = __dirname + "/public" + req.url;
  console.log(path);
  if (req.url.split(".").pop() === "jpg") {
    fs.readFile(path, (err, content) => {
      if (err) {
        console.log(err);
        return;
      }
      res.end(content);
    });
    next();
  }
  next();
});

app.get("/public", (req, res) => {
  res.send("welcome");
});

app.post("/json", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});
