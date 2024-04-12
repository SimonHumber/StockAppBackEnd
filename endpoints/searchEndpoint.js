const finnhub = require("finnhub");
const express = require("express");

const app = express();
app.use(express.json());

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.API_KEY;
const finnhubClient = new finnhub.DefaultApi();
// Wrap the Finnhub API calls in an async function
const searchEndpoint = () => {
  app.post("/search", async (req, res) => {
    try {
      const searchResult = await new Promise((resolve, reject) => {
        finnhubClient.symbolSearch(req.body.query, (error, data, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
      res.json(searchResult);
    } catch (err) {
      console.error(err);
    }
  });
  return app;
};
module.exports = searchEndpoint;
