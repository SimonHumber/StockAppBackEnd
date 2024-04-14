const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const authUser = require("../database/authUser");
const addPartner = require("../database/addPartner");
require("dotenv").config();

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
  "/addPartner",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const added = await addPartner(req.user.username, req.body.username);
      if (!added) {
        res.status(400).json({ message: "User not found!" });
      } else {
        res.status(200).json({ partners: req.user.partners });
      }
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },
);

module.exports = app;
