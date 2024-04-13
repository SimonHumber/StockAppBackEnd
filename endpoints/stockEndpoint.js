const finnhub = require("finnhub");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();
let stockData = {};
const stockEndpoint = () => {
  app.post("/stock", async (req, res) => {
    try {
      const companyProfile = await new Promise((resolve, reject) => {
        finnhubClient.companyProfile2(
          { symbol: req.body.symbol },
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          },
        );
      });
      stockData = { ...companyProfile };
      res.json(stockData);
    } catch (err) {
      console.error(err);
    }
  });
  return app;
};
module.exports = stockEndpoint;
