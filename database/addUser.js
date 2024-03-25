const User = require("./dbSchema");

const addUser = async (form) => {
  const userExists = await User.findOne({ email: form.email });
  if (userExists) {
    return true;
  } else {
    const newUser = new User(form);
    await newUser.save();
    return false;
  }
};

module.exports = addUser;
