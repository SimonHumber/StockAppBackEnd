const User = require("./dbSchema");

const partnerFav = async (username, partner) => {
  try {
    const user = await User.findOne({ username });
    const partnerIndex = user.partners.indexOf(partner);
    const userFav = await User.findOne({
      username: user.partners[partnerIndex],
    });
    return userFav.watchlist;
  } catch (err) {
    return err;
  }
};

module.exports = partnerFav;
