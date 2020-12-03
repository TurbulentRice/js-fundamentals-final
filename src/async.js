// REQUESTS

export const api = (function () {
  const key = '1fc83ef367mshe891aa0c06dcf4cp14360fjsn86475bd78dbe';
  const host = 'yahoo-finance15.p.rapidapi.com'
  return {
    key,
    host
  }
})();

export const getMostWatched = () => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/tr/trending",
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  }
  return axios.request(options)
}

export const getTopGainers = () => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers",
    params: {start: '0'},
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  }
  return axios.request(options)
}

export const getQuote = (symbol) => {
  let search = Array.isArray(symbol) ? symbol.join(",") : symbol.trim()
  const options = {
    method: "GET",
    url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/' + search,
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  }
  return axios.request(options)
}

export const getProfile = (symbol) => {
  const options = {
    method: 'GET',
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`,
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  }
  return axios.request(options)
}

export const getStockHistory = (symbol) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/15m`,
    headers: {
      'x-rapidapi-key': api.key,
      'x-rapidapi-host': api.host
    }
  }
}