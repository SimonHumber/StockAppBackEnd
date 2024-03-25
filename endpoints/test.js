const express = require("express");

const app = express();

const testEndpoint = () => {
  app.get("/test", (req, res) => {
    console.log("received test request");
    res.send("Test successful");
  });
  return app;
};
module.exports = testEndpoint;
