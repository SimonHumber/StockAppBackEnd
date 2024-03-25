const express = require("express");
const Yup = require("yup");
const mongoose = require("mongoose");
const addUser = require("../database/addUser");
require("yup-password")(Yup); // extend yup

const app = express();

app.use(express.json());

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be at least 2 characters")
    .required("First name must be at least 2 characters"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be at least 2 characters")
    .required("Last name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().password().required(),
  confirmPassword: Yup.string()
    .password()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

const registerEndpoint = () => {
  app.post("/register", async (req, res) => {
    try {
      const form = await signupSchema.validate(req.body);
      const userExists = await addUser(form);
      if (userExists) {
        res.json({
          form: false,
          message: "Email already exists.",
        });
      } else {
        res.json({ form: true, message: "Registration complete." });
      }
    } catch (error) {
      res.json({
        form: false,
        message: "Registration failure. Please try again.",
      });
    }
  });

  return app;
};

module.exports = registerEndpoint;
