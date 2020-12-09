const axios = require("axios").default;
import { testTopGainers, testQuote, testProfile, testMostWatched, testHistory } from "./test.js"
// REQUESTS

const apiOptions = (url) => ({
  method: "GET",
  url,
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': "yahoo-finance15.p.rapidapi.com"
  }
})

export const getMostWatched = () => {
  return Promise.resolve(testMostWatched) // test code
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/tr/trending"
  const options = apiOptions(url)
  return axios.request(options)
    .then(response => response.data)
    .then(data => data[0].quotes.slice(0, 10))
    .then(symbols => getQuote(symbols))
}

export const getTopGainers = () => {
  return Promise.resolve(testTopGainers) // test code
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers"
  const options = apiOptions(url)
  return axios.request(options)
    .then(response => response.data.quotes)
}

export const getQuote = (symbol) => {
  return Promise.resolve(testQuote) // test code
  let isMultiple = Array.isArray(symbol);
  let search = isMultiple ? symbol.join(",") : symbol.trim()
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${search}`
  const options = apiOptions(url)

  return axios.request(options)
    .then(response => isMultiple ? response.data : response.data[0])
  
}

export const getProfile = (symbol) => {
  return Promise.resolve(testProfile) // test code
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`
  const options = apiOptions(url)

  return axios.request(options)
    .then(response => response.data.assetProfile)
}

export const getStockHistory = (symbol, interval) => {
  return Promise.resolve(testHistory) // test code
  const url  =`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/${interval}`
  const options = apiOptions(url)


  return axios.request(options)
    .then(response => response.data)
  
}