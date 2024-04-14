const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const authUser = require("../database/authUser");
require("dotenv").config();

var opts = {};
app.use(passport.initialize());
app.use(express.json());
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
        console.log("hi");
        done(null, false);
      }
    } catch (err) {
      console.log("hi");
      done(null, false);
    }
  }),
);
app.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("fetching favorites " + req.user);
    res.status(200).json({
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      watchlist: req.user.watchlist,
      partners: req.user.partners,
    });
  },
);

module.exports = app;
