const express = require("express");
const cors = require("cors");
const registerEndpoint = require("./endpoints/registerEndpoint");
const loginEndpoint = require("./endpoints/loginEndpoint");
const logoutEndpoint = require("./endpoints/logoutEndpoint");
const searchEndpoint = require("./endpoints/searchEndpoint");
const testEndpoint = require("./endpoints/test");
const dbServer = require("./database/dbServer");
require("dotenv").config();
console.log(process.env.DB_URI);

const app = express();
dbServer();
//middleware
app.use(cors());

//endpoints
app.use("/", searchEndpoint());
app.use("/", registerEndpoint());
app.use("/", testEndpoint());
app.use("/", loginEndpoint());
app.use("/", logoutEndpoint());

//http server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
