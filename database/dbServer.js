const mongoose = require("mongoose");

const dbServer = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Connected to database");
  });
};
module.exports = dbServer;
