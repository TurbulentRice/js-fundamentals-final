// Updating DOM Elements

import { makeWatchListElement, makeQuoteDisplayComponent } from "./components.js"

// Elements
export const root = document.querySelector("#root")
export const watchList = document.querySelector("#watchList")
export const quoteDisplayCol = document.querySelector("#quoteDisplayCol")
export const quoteDisplayComponent = () => document.querySelector("#quoteDisplayComponent")


// "State" representation
// Keep track of data to avoid multiple calls
// Maybe use Sets instead of Arrays, and push new quotes on as they are called
export const currentlyDisplayed = {
  quoteComponents: [],
  watchList: []
}

// Add/remove components

export const addToWatchlist = (quote) => {
  const newListItem = makeWatchListElement(quote)
  watchList.appendChild(newListItem)
}

export const updateQuoteDisplay = (quote, profile) => {
  const newQuoteComponent = makeQuoteDisplayComponent(quote, profile)
  // "Replace" behavior. consider "add", "remove"
  quoteDisplayComponent() ? quoteDisplayCol.replaceChild(newQuoteComponent, quoteDisplayComponent())
    : quoteDisplayCol.appendChild(newQuoteComponent)

  // Update currentlyDisplayed state with data, avoid redundant calls
  currentlyDisplayed.quote = quote;
  currentlyDisplayed.profile = profile;
}

