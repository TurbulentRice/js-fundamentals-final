const axios = require("axios").default;

// Requests

const apiOptions = (url) => ({
  method: "GET",
  url,
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': "yahoo-finance15.p.rapidapi.com"
  }
})

export const getMostWatched = () => {
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/tr/trending"
  const options = apiOptions(url)
  return axios.request(options)
    .then(response => response.data)
    .then(data => data[0].quotes.slice(0, 10))
    .then(symbols => getQuote(symbols))
    .catch(error => console.log(error))
}

export const getTopGainers = () => {
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers"
  const options = apiOptions(url)
  return axios.request(options)
    .then(response => response.data.quotes)
    .catch(error => console.log(error))
}

export const getQuote = (symbol) => {
  let isMultiple = Array.isArray(symbol);
  let search = isMultiple ? symbol.join(",") : symbol.trim()
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${search}`
  const options = apiOptions(url)

  return axios.request(options)
    .then(response => isMultiple ? response.data : response.data[0])
    .catch(error => console.log(error))
}

export const getProfile = (symbol) => {
  const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`
  const options = apiOptions(url)

  return axios.request(options)
    .then(response => response.data.assetProfile)
    .catch(error => console.log(error))
}

export const getStockHistory = (symbol, interval) => {
  const url  =`https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/${interval}`
  const options = apiOptions(url)


  return axios.request(options)
    .then(response => response.data)
    .catch(error => console.log(error))
}