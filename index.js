const express = require("express");
const cors = require("cors");
const registerEndpoint = require("./endpoints/registerEndpoint");
const loginEndpoint = require("./endpoints/loginEndpoint");
const searchEndpoint = require("./endpoints/searchEndpoint");
const testEndpoint = require("./endpoints/test");
const dbServer = require("./database/dbServer");
require("dotenv").config();

const app = express();
app.use(cors());
dbServer();

//endpoints
app.use("/", searchEndpoint);
app.use("/", registerEndpoint);
app.use("/", testEndpoint);
app.use("/", loginEndpoint);

//http server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
