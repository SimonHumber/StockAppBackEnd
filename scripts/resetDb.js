const mongoose = require("mongoose");
const User = require("../database/dbSchema");
const dbServer = require("../database/dbServer");

async function wipeDB() {
  try {
    dbServer();
    await User.collection.drop();
    await mongoose.disconnect();
    console.log("\nDatabase wiped");
  } catch (error) {
    console.error(error);
  }
}
wipeDB();
