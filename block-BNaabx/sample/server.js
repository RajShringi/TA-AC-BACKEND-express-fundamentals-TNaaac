const express = require("express");
const fs = require("fs");
// var { access, constants } = require("fs");

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
  const filePath = __dirname + "/public" + req.url;
  console.log(filePath);
  if (req.url.split(".").pop() === "jpg") {
    fs.readFile(filePath, (err, content) => {
      console.log(err, content);
      if (err) {
        console.log(err);
        next();
      } else {
        console.log("execute");
        res.setHeader("content-type", "image/jpeg");
        res.sendFile(filePath);
      }
    });
  }
});

// app.use((req, res, next) => {
//   if (req.url === "/") return next();
//   const filePath = __dirname + "/public" + req.url;
//   access(filePath, constants.F_OK, (err) => {
//     if (err) {
//       return next();
//     } else {
//       res.contentType("image/jpeg");
//       res.sendFile(filePath);
//     }
//   });
// });

app.get("/public", (req, res) => {
  res.send("welcome");
});

app.post("/json", (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("server is listening on port 3k");
});
