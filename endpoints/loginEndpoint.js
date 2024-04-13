const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const app = express();
const User = require("../database/dbSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//initialize passport for user auth and integrating with express session
app.use(passport.initialize());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      //attempt to find the user by their username
      const user = await User.findOne({ username });
      if (user) {
        //if user is found, compare the provided password with the hashed password in database
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user); //if password matches, authenticate user
        }
      }
      return done(null, false); // if password/username doesn't match, return false
    } catch (err) {
      done(err);
    }
  }),
);

//this uses the passport local strategy for authentication
// runs passport.use
//if authentication is successful, the user will be logged in
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const JWT_SECRET = process.env.SECRET;
    const token = jwt.sign({ id: req.body.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send(token);
  },
);

module.exports = app;
