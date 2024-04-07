const bcrypt = require("bcrypt");
const User = require("./dbSchema");

const addUser = async (form) => {
  const loginExists = await User.findOne({ username: form.username });
  const emailExists = await User.findOne({ email: form.email });
  if (loginExists || emailExists) {
    return true;
  }
  const hashedPassword = await bcrypt.hash(form.password, 10);
  const newUser = new User({
    username: form.username,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: hashedPassword,
  });
  await newUser.save();
  return false;
};

module.exports = addUser;
