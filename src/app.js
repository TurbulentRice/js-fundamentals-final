// Updating DOM Elements
import { makeWatchListElement, makeQuoteDisplayComponent, makeChartComponent } from "./components.js"

// Elements
export const root = document.querySelector("#root")
export const watchList = document.querySelector("#watchList")
export const quoteDisplayCol = document.querySelector("#quoteDisplayCol")
export const quoteDisplayComponent = () => document.querySelector("#quoteDisplayComponent")


// "State" representation
// Keep track of data to avoid multiple calls
export const currentlyDisplayed = {
  quoteComponents: [],
  watchList: [],
  histories: {}
}

// Add/remove components
export const addToWatchlist = (quote) => {
  const newListItem = makeWatchListElement(quote)
  watchList.appendChild(newListItem)
}

export const updateQuoteDisplay = (quote, profile) => {
  const replaceQuoteComponent = (newComponent, oldComponent) => {
    quoteDisplayCol.replaceChild(newComponent, oldComponent.component)
    removeQuoteComponentFromState(oldComponent.symbol)
  }
  const addQuoteComponent = (newComponent) => {
    quoteDisplayCol.appendChild(newComponent)
  }

  const newQuoteComponent = makeQuoteDisplayComponent(quote, profile)

  // Check currentlyDisplayed to decide replace/add behavior
  let alreadyDisplayed = currentlyDisplayed.quoteComponents.find(component => component.symbol === quote.symbol)
  alreadyDisplayed
    ? replaceQuoteComponent(newQuoteComponent, alreadyDisplayed)
    : addQuoteComponent(newQuoteComponent)
    
  // Update state
  let componentObj = {
    symbol: quote.symbol,
    profile,
    component: newQuoteComponent
  }
  currentlyDisplayed.quoteComponents.push(componentObj);
}

export const removeQuoteComponentFromState = (symbol) => {
  currentlyDisplayed.quoteComponents = currentlyDisplayed.quoteComponents.filter(component => component.symbol !== symbol)
}
export const removeFromQuoteDisplay = (componentToRemove) => {
  removeQuoteComponentFromState(componentToRemove.dataset.symbol)
  componentToRemove.remove()
}

export const addChartToQuoteDisplay = (history) => {
  const chartDiv = document.querySelector(`#${history.meta.symbol}ChartDiv`)
  chartDiv.style.display = "block"
  currentlyDisplayed.histories[history.meta.symbol] = history;
  const newChart = makeChartComponent(history, chartDiv)
  newChart.render()
}

