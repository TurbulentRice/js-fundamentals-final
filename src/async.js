const axios = require("axios").default;

const api = {
  HOST: process.env.API_HOST,
  KEY: process.env.API_KEY,
  BASE_URL: `https://${process.env.API_HOST}`,
};

// Requests

const apiOptions = (url, body) => ({
  method: "GET",
  url,
  params: body,
  headers: {
    "x-rapidapi-key": api.KEY,
    "x-rapidapi-host": api.HOST,
  },
});

export const getMostWatched = () => {
  const url = api.BASE_URL + "/tr/trending";
  return axios
    .request(apiOptions(url))
    .then((response) => response.data)
    .then((data) => data.body.slice(0, 10))
    .then((symbols) => getQuote(symbols))
    .catch((error) => console.log(error));
};

export const getTopGainers = () => {
  // Removed 9/23, changed endpoints
  // const url = api.BASE_URL + "/ga/topgainers"
  const url = api.BASE_URL + "/co/collections/day_gainers";
  return axios
    .request(apiOptions(url))
    .then((response) => response.data.body)
    .catch((error) => console.log(error));
};

export const getQuote = (symbol) => {
  let isMultiple = Array.isArray(symbol);
  let search = isMultiple ? symbol.join(",") : symbol.trim();
  const url = api.BASE_URL + `/qu/quote?symbol=${search}`;

  return axios
    .request(apiOptions(url))
    .then((response) => (isMultiple ? response.data.body : response.data.body[0]))
    .catch((error) => console.log(error));
};

export const getProfile = (symbol) => {
  const url = api.BASE_URL + `/qu/quote/asset-profile`;

  return axios
    .request(apiOptions(url, { symbol }))
    .then((response) => response.data.body)
    .catch((error) => console.log(error));
};

export const getStockHistory = (symbol, interval, diffandsplits = 'false') => {
  const url = api.BASE_URL + `/hi/history`;

  return axios
    .request(apiOptions(url, { symbol, interval, diffandsplits }))
    .then((response) => response.data)
    .catch((error) => console.log(error));
};
