import "./style.scss"
import { getMostWatched, getTopGainers, getQuote, getProfile, getStockHistory } from "./async.js"
import * as app from "./app.js"

// Events
// Follow form: getData.then(addDataToComponent)

/////////////////////
// Listeners
/////////////////////
const addListeners = {
  toWatchlist: () => document.querySelectorAll(".watchListElement").forEach(li => li.addEventListener('click', displayQuote)),
  toQuoteDisplay: () => {
    document.querySelectorAll(".showChartBtn").forEach(btn => btn.onclick =  showChart)
    document.querySelectorAll(".removeQuoteComponentBtn").forEach(btn => btn.addEventListener('click', removeQuote))
  }
}

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
const updateWatchList = event => {
  app.watchList.innerHTML = "";
  const update = event.target.value === "Top gainers"
    ? populateTopGainers()
    : populateMostWatched();
  update.then(() => addListeners.toWatchlist())
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
      .catch(error => console.log(error))
  }

  // Get quote, get profile, then update
  Promise.all([getQuote(symbol), getProfile(symbol)])
    .then(quoteAndProfile => app.updateQuoteDisplay(...quoteAndProfile))
    .then(() => addListeners.toQuoteDisplay())
    .catch(error => console.log(error)
  )
}

const removeQuote = event => {
  app.removeFromQuoteDisplay(event.target.parentNode.parentNode)
}

// Show chart button action, adds a Chart component to Quote
const showChart = event => {
  // Determine symbol and interval
  let symbol = event.target.dataset.symbol
  let interval = '1d'
  let quoteComponentObj = app.currentlyDisplayed.quoteComponents.find(component => component.symbol === symbol)

  // Check currentlyDisplayed for matching history
  const alreadyDisplayed = app.currentlyDisplayed.histories[symbol]
  alreadyDisplayed
    ? app.addChartToQuoteDisplay(alreadyDisplayed)
    : getStockHistory(symbol, interval)
      .then(history => app.addChartToQuoteDisplay(history))

  // Change "show chart" button to "hide chart" and assign new onlick
  // from here on out will toggle between hide and show
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

//////////////////////
// HISTORY
//////////////////////



// Setup
document.querySelector("#watchListSelect")
  .addEventListener('change', updateWatchList)
document.querySelector("#searchBtn")
  .addEventListener('click', searchStockTicker)
  
populateTopGainers().then(() => {
  addListeners.toWatchlist()
  app.watchList.firstChild.click()
});


