const axios = require("axios").default;

const api = {
  HOST: process.env.API_HOST,
  KEY: process.env.API_KEY,
  BASE_URL: `https://${process.env.API_HOST}`
}

// Requests

const apiOptions = (url) => ({
  method: "GET",
  url,
  headers: {
    'x-rapidapi-key': api.KEY,
    'x-rapidapi-host': api.HOST
  }
})

export const getMostWatched = () => {
  const url = api.BASE_URL + "/tr/trending"
  return axios.request(apiOptions(url))
    .then(response => response.data)
    .then(data => data[0].quotes.slice(0, 10))
    .then(symbols => getQuote(symbols))
    .catch(error => console.log(error))
}

export const getTopGainers = () => {
  // Removed 9/23, changed endpoints
  // const url = api.BASE_URL + "/ga/topgainers"
  const url = api.BASE_URL + "/co/collections/day_gainers"
  return axios.request(apiOptions(url))
    .then(response => response.data.quotes)
    .catch(error => console.log(error))
}

export const getQuote = (symbol) => {
  let isMultiple = Array.isArray(symbol);
  let search = isMultiple ? symbol.join(",") : symbol.trim()
  const url = api.BASE_URL + `/qu/quote?symbol=${search}`

  return axios.request(apiOptions(url))
    .then(response => isMultiple ? response.data : response.data[0])
    .catch(error => console.log(error))
}

export const getProfile = (symbol) => {
  const url = api.BASE_URL + `/qu/quote/${symbol}/asset-profile`

  return axios.request(apiOptions(url))
    .then(response => response.data.assetProfile)
    .catch(error => console.log(error))
}

export const getStockHistory = (symbol, interval) => {
  const url  = api.BASE_URL + `/hi/history/${symbol}/${interval}`

  return axios.request(apiOptions(url))
    .then(response => response.data)
    .catch(error => console.log(error))
}