import QuotelistCard from "./Components/QuotelistCard.js"
import WatchlistCard from "./Components/WatchlistCard.js"
import ChartCard from "./Components/ChartCard.js"

// Updating DOM

// Elements
export const root = document.querySelector("#root")
export const watchList = document.querySelector("#watchList")
export const quoteDisplayCol = document.querySelector("#quoteDisplayCol")
export const quoteDisplayComponent = () => document.querySelector("#quoteDisplayComponent")

// "Cache" - Keeps track of some data to avoid multiple calls
export const currentlyDisplayed = {
  quoteComponents: [],
  watchList: [],
  histories: {}
}

// Add/remove components
export const addToWatchlist = (quote) => {
  const newListItem = WatchlistCard(quote)
  watchList.appendChild(newListItem)
}

export const updateQuoteDisplay = (quote, profile) => {
  // Separate replace/add functions
  const replaceQuoteComponent = (newComponent, oldComponent) => {
    quoteDisplayCol.replaceChild(newComponent, oldComponent.component)
    removeQuoteComponentFromCache(oldComponent.symbol)
  }
  const addQuoteComponent = (newComponent) => {
    quoteDisplayCol.appendChild(newComponent)
  }

  const newQuoteComponent = QuotelistCard(quote, profile)

  // Check currentlyDisplayed to decide replace/add behavior
  let alreadyDisplayed = currentlyDisplayed.quoteComponents.find(component => component.symbol === quote.symbol)
  alreadyDisplayed
    ? replaceQuoteComponent(newQuoteComponent, alreadyDisplayed)
    : addQuoteComponent(newQuoteComponent)
    
  // Update cache
  let componentObj = {
    symbol: quote.symbol,
    profile,
    component: newQuoteComponent
  }
  currentlyDisplayed.quoteComponents.push(componentObj);
}

export const removeQuoteComponentFromCache = (symbol) => {
  currentlyDisplayed.quoteComponents = currentlyDisplayed.quoteComponents.filter(component => component.symbol !== symbol)
}

export const removeFromQuoteDisplay = (componentToRemove) => {
  const symbol = componentToRemove.dataset.symbol
  removeQuoteComponentFromCache(symbol)
  componentToRemove.remove()
}

export const addChartToQuoteDisplay = (history) => {
  const chartDiv = document.querySelector(`#${history.meta.symbol}ChartDiv`)
  chartDiv.style.display = "block"
  currentlyDisplayed.histories[history.meta.symbol] = history;
  const newChart = ChartCard(history, chartDiv)
  newChart.render()
}

