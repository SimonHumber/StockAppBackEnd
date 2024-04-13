const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  console.log("received test request");
  res.send("Test successful");
});
module.exports = app;
