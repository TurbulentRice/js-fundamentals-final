import "./style.scss"
import { getMostWatched, getTopGainers, getQuote, getProfile, getStockHistory } from "./async.js"
import * as app from "./app.js"

// Events


/////////////////////
// SEARCH
/////////////////////
const searchStockTicker = event => {
  const symbol = document.querySelector("#stockTickerInput").value.trim().toUpperCase();
  
  // Decides if search works, replace with check
  const symbolIsGood = true;
  symbolIsGood && displayQuote(event);
}

//////////////////////
// WATCHLIST
//////////////////////
const addWatchlistListeners = () => {
  document.querySelectorAll(".watchListElement").forEach(li => li.addEventListener('click', displayQuote));
}

const updateWatchList = event => {
  app.watchList.innerHTML = "";
  const update = event.target.value === "Top gainers" ? populateTopGainers() : populateMostWatched();
  update.then(() => addWatchlistListeners())
}

const populateMostWatched = () => {
  return getMostWatched()
    .then(quotes => {
      quotes.forEach(quote => app.addToWatchlist(quote))
      app.currentlyDisplayed.watchList = quotes
    })
    .catch(error => console.log(error))
}

const populateTopGainers = () => {
  return getTopGainers()
    .then(data => {
      data.forEach(quote => app.addToWatchlist(quote))
      app.currentlyDisplayed.watchList = data;
    })
    .catch(error => console.log(error))
}

//////////////////////
// QUOTE DISPLAY
//////////////////////
const displayQuote = event => {
  const symbol = event.target.id === 'searchBtn'
    ? document.querySelector("#stockTickerInput").value.trim().toUpperCase()
    : event.target.id;

  // Check if the symbol is already stored, display from memory
  const quoteFromWatchList = app.currentlyDisplayed.watchList.find(element => element.symbol === symbol)
  if (quoteFromWatchList) {
    return getProfile(symbol)
      .then(profile => app.updateQuoteDisplay(quoteFromWatchList, profile))
      .catch(error => console.log(error))
  }

  // Get quote, get profile, then update
  Promise.all([getQuote(symbol), getProfile(symbol)])
    .then(quoteAndProfile => app.updateQuoteDisplay(...quoteAndProfile))
    .catch(error => console.log(error)
  )
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


