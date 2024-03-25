const Yup = require("yup");
require("yup-password")(Yup);

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
console.log(signupSchema.validate());
