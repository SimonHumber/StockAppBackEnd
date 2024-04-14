const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const app = express();
const partnerFav = require("../database/partnerFav");
const authUser = require("../database/authUser");
require("dotenv").config();

app.post(
  "/partnerFav",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const partnerFavs = partnerFav(req.body.partner);
      res.status(200).json(partnerFavs);
    } catch (err) {
      res.status(500).json({ message: "Database error" });
    }
  },
);

module.exports = app;
