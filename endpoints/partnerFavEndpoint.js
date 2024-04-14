const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const partnerFav = require("../database/partnerFav");
const authUser = require("../database/authUser.js");
const app = express();
require("dotenv").config();

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
  "/partnerFav",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const partnerFavs = await partnerFav(req.user.username, req.body.partner);
      res.status(200).json(partnerFavs);
    } catch (err) {
      res.status(500).json({ message: "Database error" });
    }
  },
);

module.exports = app;
