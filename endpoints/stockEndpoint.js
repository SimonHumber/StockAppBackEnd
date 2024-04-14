const finnhub = require("finnhub");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();
let stockData = {};
app.post("/stock", async (req, res) => {
  try {
    // Run both API calls concurrently
    const [companyProfile, companyNews, companyValue] = await Promise.all([
      new Promise((resolve, reject) => {
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
      }),
      new Promise((resolve, reject) => {
        finnhubClient.companyNews(
          req.body.symbol,
          "2024-01-01",
          "2024-04-14",
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          },
        );
      }),
      new Promise((resolve, reject) => {
        finnhubClient.companyBasicFinancials(
          req.body.symbol,
          "metric",
          (error, data, response) => {
            if (error) {
              reject(error);
            } else {
              resolve(data);
            }
          },
        );
      }),
    ]);
    const stockData = {
      companyProfile,
      companyNews,
      companyValue,
    };
    console.log(companyValue);

    res.status(200).json(stockData);
  } catch (err) {
    res.status(500).json({ errorMessage: "API call to finnhub failed" });
  }
});
module.exports = app;
