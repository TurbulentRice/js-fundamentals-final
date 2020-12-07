const axios = require("axios").default;
import { testTopGainers, testQuote, testProfile, testMostWatched } from "./test.js"
// REQUESTS

const apiOptions = (url) => ({
  method: "GET",
  url,
  headers: {
    'x-rapidapi-key': process.env.apiKey,
    'x-rapidapi-host': process.env.apiHost
  }
})

export const getMostWatched = () => {
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/tr/trending"
  const options = apiOptions(url)
  console.log(options)

  // return axios.request(options)
  //   .then(response => response.data[0].quotes.slice(0, 10))
  //   .then(symbols => getQuote(symbols))
  //   .then(data => data.data)
  return Promise.resolve(testMostWatched)
}

export const getTopGainers = () => {
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers"
  const options = apiOptions(url)
  // return axios.request(options)
  //   .then(response => response.data.quotes)
  return Promise.resolve(testTopGainers)
}

export const getQuote = (symbol) => {
  let search = Array.isArray(symbol) ? symbol.join(",") : symbol.trim()
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${search}`
  const options = apiOptions(url)

  // return axios.request(options)
  //   .then(response => response.data[0])
  return Promise.resolve(testQuote)
}

export const getProfile = (symbol) => {
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`
  const options = apiOptions(url)

  // return axios.request(options)
  //   .then(response => response.data.assetProfile)
  return Promise.resolve(testProfile)
}

export const getStockHistory = (symbol) => {
  const url  =`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/15m`
  const options = apiOptions(url)

  // return axios.request(options)
  //   .then(response => response.data)
  return Promise.resolve(testHistory)
}