const User = require("./dbSchema");

const toggleFav = async (username, symbol) => {
  try {
    // Find the user in the database
    const user = await User.findOne({ username });
    if (user) {
      // Check if the symbol already exists in the portfolio
      const index = user.watchlist.indexOf(symbol);
      if (index !== -1) {
        // If symbol exists, remove it from the portfolio
        user.watchlist.splice(index, 1);
      } else {
        // If symbol doesn't exist, add it to the portfolio
        user.watchlist.push(symbol);
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

module.exports = toggleFav;
