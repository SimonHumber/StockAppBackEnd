const express = require("express");
const passport = require("passport");
const JwtStrategy = require("passport-jwt");
const bcrypt = require("bcrypt");
const app = express();
const User = require("../database/dbSchema");

//initialize passport for user auth and integrating with express session
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new JwtStrategy(async (form, done) => {
    console.log("in Local Strategy", form.username);
    try {
      //attempt to find the user by their username
      const user = await User.findOne({ username: form.username });
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" }); //if user not found, return false
      }

      //if user is found, compare the provided password with the hashed password in database
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user); //if password matches, authenticate user
      } else {
        return done(null, false, { message: "Incorrect username or password" }); // if password doesn't match, return false
      }
    } catch (err) {
      done(err);
    }
  }),
);

//serialize user to decide which data of the user object should be stored in the session
//here we are storing only the user id in the session
//this code only runs after user successfully logs in
// passport.serializeUser((user, done) => {
//   console.log("ID in serialize : ", user);
//   done(null, user.id);
// });

//deserialize user to retrieve the user data from the session using the user id
//this code runs when a logged in user makes successive calls
// passport.deserializeUser(async (id, done) => {
//   console.log("ID in deserialize : ", id);
//   try {
//     const user = await User.findById(id);
//     done(null, user); // the user object is attached to the request object as req.user
//   } catch (err) {
//     done(err, null);
//   }
// });

//this uses the passport local strategy for authentication
// runs passport.use
//if authentication is successful, the user will be logged in
const loginEndpoint = () =>
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json({ message: "Login successful" });
  });

//logout endpoint
//this endpoint logs the user out and ends the session
app.get("/logout", (req, res) => {
  req.logout(); //passport provides this method to logout
  console.log("User logged out");
  res.status(200);
});
module.exports = loginEndpoint;
