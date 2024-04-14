const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const User = require("../database/dbSchema");
const authUser = require("../database/authUser");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(passport.initialize());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await authUser(jwt_payload.id);
      if (user) {
        //if user exists the user into the req
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(null, false);
    }
  }),
);
app.post(
  "/favorite",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.status(200).json(req.user.watchlist);
  },
);

module.exports = app;
