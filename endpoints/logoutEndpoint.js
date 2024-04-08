const express = require("express");
const passport = require("passport");

const app = express();
app.use(passport.initialize());

//TODO see if this is necessary
const logoutEndpoint = () =>
  app.get("/logout", (req, res) => {
    req.logout(); //passport provides this method to logout
    console.log("User logged out");
    res.status(200);
  });

module.exports = logoutEndpoint;
