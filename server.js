const express = require("express");
const cors = require("cors");
const registerEndpoint = require("./endpoints/register");
const testEndpoint = require("./endpoints/test");
const dbServer = require("./database/dbServer");

const app = express();
dbServer();
//middleware
app.use(cors());

//endpoints
app.use("/", registerEndpoint());
app.use("/", testEndpoint());

//http server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
