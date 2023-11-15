import { getMostWatched, getTopGainers, getQuote, getProfile, getStockHistory } from "./async.js";
import * as app from "./app.js";

// Main events

/////////////////////
// UPDATE LISTENERS
/////////////////////
const addListeners = {
  toWatchlist: () => document.querySelectorAll(".watchListElement").forEach(li => li.addEventListener('click', displayQuote)),
  toQuoteDisplay: () => {
    $('[data-toggle="popover"]').popover();
    document.querySelectorAll(".showChartBtn").forEach(btn => btn.onclick =  showChart);
    document.querySelectorAll(".removeQuoteComponentBtn").forEach(btn => btn.addEventListener('click', removeQuote))
  }
}

/////////////////////
// SEARCH
/////////////////////
const searchStockTicker = event => {
  const symbol = document.querySelector("#stockTickerInput").value.trim().toUpperCase();
  // Check that value is not blank, no spaces, no numbers
  const symbolIsGood = symbol && !(symbol.includes(" ")) && symbol && symbol.split("").every(char => isNaN(char))
  
  symbolIsGood && displayQuote(event).catch(error => console.log(error));
}

//////////////////////
// WATCHLIST
//////////////////////
const updateWatchList = event => {
  app.watchList.innerHTML = "";
  const update = event.target.value === "Top gainers"
    ? populateTopGainers() : populateMostWatched();
  update.then(() => addListeners.toWatchlist()).catch(error => console.log(error))
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
  // Check if the symbol is already stored, display quote from memory
  const quoteFromWatchList = app.currentlyDisplayed.watchList.find(element => element.symbol === symbol)
  if (quoteFromWatchList) {
    return getProfile(symbol)
      .then(profile => app.updateQuoteDisplay(quoteFromWatchList, profile))
      .then(() => addListeners.toQuoteDisplay())
      .catch(error => alert(`Invalid search: "${symbol}" -> Error: ${error}`))
  }
  // Get quote, get profile, then update
  return Promise.all([getQuote(symbol), getProfile(symbol)])
    .then(quoteAndProfile => app.updateQuoteDisplay(...quoteAndProfile))
    .then(() => addListeners.toQuoteDisplay())
    .catch(error => alert(`Invalid search: "${symbol}" -> Error: ${error}`)
  )
}

const removeQuote = event => {
  app.removeFromQuoteDisplay(event.target.parentNode.parentNode)
}


//////////////////////
// GRAPHING
//////////////////////
const showChart = event => {
  let symbol = event.target.dataset.symbol
  let interval = '1d'

  // Check currentlyDisplayed for matching history
  const alreadyDisplayed = app.currentlyDisplayed.histories[symbol]
  alreadyDisplayed
    ? app.addChartToQuoteDisplay(alreadyDisplayed)
    : getStockHistory(symbol, interval)
      .then(history => app.addChartToQuoteDisplay(history))
      .catch(error => console.log(error))

  // Toggle show/hide chart
  const displaySelector = document.querySelector(`#${symbol}ShowChartBtn`);
  displaySelector.textContent = "Hide chart";
  displaySelector.onclick = hideChart;
}

const hideChart = event => {
  const symbol = event.target.dataset.symbol
  const chartDiv = document.querySelector(`#${symbol}ChartDiv`)
  chartDiv.style.display = "none"
  const displaySelector = document.querySelector(`#${symbol}ShowChartBtn`);
  displaySelector.textContent = "Show chart";
  displaySelector.onclick = reShowChart;
}

const reShowChart = event => {
  const symbol = event.target.dataset.symbol
  const chartDiv = document.querySelector(`#${symbol}ChartDiv`)
  chartDiv.style.display = "block"
  const displaySelector = document.querySelector(`#${symbol}ShowChartBtn`);
  displaySelector.textContent = "Hide chart";
  displaySelector.onclick = hideChart;
}

// Setup

document.querySelector("#watchListSelect")
  .addEventListener('change', updateWatchList)
document.querySelector("#searchBtn")
  .addEventListener('click', searchStockTicker)
  
populateTopGainers().then(() => {
  addListeners.toWatchlist()
  app.watchList.firstChild.click()
});

