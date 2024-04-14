const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const authUser = require("../database/authUser");
const toggleFav = require("../database/toggleFav");
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
  "/toggleFav",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    toggleFav(req.user.username, req.body.symbol);
    res.status(200).json(req.user.watchlist.includes(req.body.symbol));
  },
);

module.exports = app;
