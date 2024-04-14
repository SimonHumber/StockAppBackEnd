const User = require("./dbSchema");

const removePartner = async (username, partner) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (user) {
      // Check if the symbol already exists in the portfolio
      const index = user.partners.indexOf(partner);
      if (index !== -1) {
        // If symbol exists, remove it from the portfolio
        user.partners.splice(index, 1);
      } else {
        // If symbol doesn't exist, add it to the portfolio
        return user;
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

module.exports = removePartner;
