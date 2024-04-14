const User = require("./dbSchema");

const partnerFav = async (partner) => {
  try {
    const user = await User.findOne({ username: partner });
    if (user) {
      return user.watchlist;
    }
    return false;
  } catch (err) {
    return err;
  }
};

module.exports = partnerFav;
