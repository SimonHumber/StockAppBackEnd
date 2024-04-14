const express = require("express");
const cors = require("cors");
const registerEndpoint = require("./endpoints/registerEndpoint");
const loginEndpoint = require("./endpoints/loginEndpoint");
const searchEndpoint = require("./endpoints/searchEndpoint");
const stockEndpoint = require("./endpoints/stockEndpoint");
const favoriteEndpoint = require("./endpoints/favoriteEndpoint");
const toggleFavEndpoint = require("./endpoints/toggleFavEndpoint");
const userDataEndpoint = require("./endpoints/userDataEndpoint");
const addPartnerEndpoint = require("./endpoints/addPartnerEndpoint");
const removePartnerEndpoint = require("./endpoints/removePartnerEndpoint");
const partnerFavEndpoint = require("./endpoints/partnerFavEndpoint");
const testEndpoint = require("./endpoints/test");
const dbServer = require("./database/dbServer");
require("dotenv").config();

const app = express();
app.use(cors());
dbServer();

//endpoints
app.use("/", searchEndpoint);
app.use("/", stockEndpoint);
app.use("/", registerEndpoint);
app.use("/", loginEndpoint);
app.use("/", favoriteEndpoint);
app.use("/", toggleFavEndpoint);
app.use("/", userDataEndpoint);
app.use("/", addPartnerEndpoint);
app.use("/", removePartnerEndpoint);
app.use("/", partnerFavEndpoint);
app.use("/", testEndpoint);

//http server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
