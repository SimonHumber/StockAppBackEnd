const express = require("express");
const Yup = require("yup");
const addUser = require("../database/addUser");
require("yup-password")(Yup); // extend yup

const app = express();

app.use(express.json());

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be between 3-20 characters")
    .max(20, "Username must be between 3-20 characters")
    .required("Username must be between 3-20 characters"),
  firstName: Yup.string()
    .min(2, "First name must be between 2-20 characters")
    .max(20, "First name must be between 2-20 characters")
    .required("First name must be between 2-20 characters"),
  lastName: Yup.string()
    .min(2, "Last name must be between 2-20 characters")
    .max(20, "Last name must be between 2-20 characters")
    .required("Last name must be between 2-20 characters"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(2, "Password must be at least 8 characters")
    .max(30, "Password can be no longer than 30 characters")
    .minUppercase(1, "Password must have at least 1 uppercase")
    .minLowercase(1, "Password must have at least 1 lowercase")
    .minSymbols(1, "Password must have at least 1 symbol")
    .minNumbers(1, "Password must have at least 1 number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .password()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Passwords must match"),
});

const registerEndpoint = () => {
  app.post("/register", async (req, res) => {
    try {
      const form = await signupSchema.validate(req.body);
      const registerSuccess = await addUser(form);
      if (registerSuccess) {
        res.status(200).json({ message: "Registration successful" });
      } else {
        res.status(409).json({ message: "Username or email already exists" });
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error in registration, please try again" });
    }
  });

  return app;
};

module.exports = registerEndpoint;
