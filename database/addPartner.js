const User = require("./dbSchema");

const addPartner = async (username, partner) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (user) {
      // Check if the symbol already exists in the portfolio
      const index = user.partners.indexOf(partner);
      if (index !== -1) {
        // If symbol exists, remove it from the portfolio
        return user;
      } else if (await User.findOne({ username: partner })) {
        // If symbol doesn't exist, add it to the portfolio
        user.partners.push(partner);
      } else {
        return false;
      }
      // Save the updated user document
      await user.save();
      return user;
    }
    return false;
  } catch (err) {
    return err;
  }
};

module.exports = addPartner;
