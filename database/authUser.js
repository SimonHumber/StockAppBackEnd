const User = require("./dbSchema");

const authUser = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    return err;
  }
};

module.exports = authUser;
