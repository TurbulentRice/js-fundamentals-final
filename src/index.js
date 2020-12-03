import "./style.scss"
import { api, getMostWatched, getTopGainers, getQuote, getProfile, getStockHistory } from "./async.js"
import * as app from "./app.js"
import { testWatchList, testQuote, testProfile, testMostWatched } from "./test.js"
const axios = require("axios").default;

const addWatchlistListeners = () => {
  document.querySelectorAll(".watchListElement").forEach(li => li.addEventListener('click', displayQuote));
}

/////////////////////
// SEARCH
/////////////////////
const searchStockTicker = event => {
  const symbol = document.querySelector("#stockTickerInput").value.trim().toUpperCase();
  
  // This decides if search works, replace with check
  const symbolIsGood = false;
  symbolIsGood && displayQuote(event);
}

//////////////////////
// WATCHLIST
//////////////////////
const updateWatchList = event => {
  app.watchList.innerHTML = "";
  
  const update = event.target.value === "Top gainers" ? populateTopGainers() : populateMostWatched();
  update.then(addWatchlistListeners())
}

const populateMostWatched = () => {
  // return getMostWatched()
  //   .then(response => response.data[0].quotes.slice(0, 25))
  //   .then(symbols => getQuote(symbols))
  //   .then(data => data.data)
  //   .then(quotes => {
  //     quotes.forEach(quote => app.addToWatchlist(quote))
  //     app.currentlyDisplayed.watchList = quotes
  //   })
  //   .catch(error => console.log(error))

  // Test code
  testMostWatched.forEach(quote => app.addToWatchlist(quote))
  app.currentlyDisplayed.watchList = testMostWatched;
  return Promise.resolve("Test Most Watched");
}

const populateTopGainers = () => {
  // return getTopGainers()
  //   .then(response => response.data.quotes)
  //   .then(data => {
  //     data.forEach(quote => app.addToWatchlist(quote))
  //     app.currentlyDisplayed.watchList = data;
  //   })
  //   .catch(error => console.log(error))
  
  // Test code
  testWatchList.forEach(quote => app.addToWatchlist(quote))
  app.currentlyDisplayed.watchList = testWatchList;
  return Promise.resolve("Test Top Gainers");
}

//////////////////////
// QUOTE DISPLAY
//////////////////////
const displayQuote = event => {
  const symbol = event.target.id === 'searchBtn'
    ? document.querySelector("#stockTickerInput").value.trim().toUpperCase()
    : event.target.id;
  // let quote;
  // let profile;
  // getQuote(symbol)
  //   .then(response => response.data[0])
  //   .then(data => quote = data)
  //   .then(() => getProfile(symbol))
  //   .then(response => response.data.assetProfile)
  //   .then(assetProfile => profile = assetProfile)
  //   .then(() => app.updateQuoteDisplay(quote, profile))
  //   .catch(error => console.log(error))
  app.updateQuoteDisplay(app.currentlyDisplayed.watchList.find(element => element.symbol === symbol), testProfile)
}

//////////////////////
// HISTORY
//////////////////////



// Setup
document.querySelector("#watchListSelect")
  .addEventListener('change', updateWatchList)
document.querySelector("#searchBtn")
  .addEventListener('click', searchStockTicker)
populateTopGainers().then(() => {
  addWatchlistListeners()
  app.watchList.firstChild.click()
});




