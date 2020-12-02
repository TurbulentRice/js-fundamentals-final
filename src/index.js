import "./style.scss"
import { testData, testQuote, testProfile } from "./test.js"
import * as currencySymbols from "./currencySymbols.json"
const axios = require("axios").default;
const xss = require("xss")

const apiKey = '1fc83ef367mshe891aa0c06dcf4cp14360fjsn86475bd78dbe'
const apiHost = 'yahoo-finance15.p.rapidapi.com'

// Holds data about currently selected for reference later
const currentlyDisplayed = {
  quote: undefined,
  profile: undefined,
  history: undefined,
}

// DOM Elements
const root = document.querySelector("#root")
const topGainersList = document.querySelector("#topGainersList")
const quoteDisplayCol = document.querySelector("#quoteDisplayCol")
const quoteDisplayComponent = () => document.querySelector("#quoteDisplayComponent")

// Get a company profile
const getProfile = (symbol) => {
  const options = {
    method: 'GET',
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}/asset-profile`,
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  }
  return axios.request(options)
}



//////////////////////
// HISTORY
//////////////////////
const getStockHistory = (symbol) => {
  const options = {
    method: "GET",
    url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${symbol}/15m`,
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  }
}

////////////////
// SHOW QUOTE DATA
////////////////
const displayQuote = (event) => {
  // const symbol = event.target.id
  // let quote;
  // let profile;
  // getQuote(symbol)
  //   .then(response => response.data[0])
  //   .then(data => quote = data)
  //   .then(() => getProfile(symbol))
  //   .then(response => response.data.assetProfile)
  //   .then(assetProfile => profile = assetProfile)
  //   .then(() => updateQuoteDisplay(quote, profile))
  //   .catch(error => console.log(error))
  updateQuoteDisplay(testQuote, testProfile)
}

const getQuote = (symbol) => {
  const options = {
    method: "GET",
    url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/' + symbol,
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  }
  return axios.request(options)
}

// Update HTML within quoteDisplayCol
// Since this is very close to the DOM, move to app.js
const updateQuoteDisplay = (quote, profile) => {
  const currency = currencySymbols[quote.currency]
  let html = xss(
    `<div class="d-flex justify-content-between">
      <h2 class="display-4">${quote.symbol}</h2>
    </div>
    <div class="d-flex justify-content-between">
      <p class="lead">${quote.longName}</p>
      <p><small>${profile.industry}, ${profile.sector}</small></p>
      <p><small>${profile.city}, ${profile.country} (${currency.name})</small></p>
    </div>
    <hr class="my-2">
    <div id="quoteTable" class="container-fluid">
      <div class="row">
        <div class="col">
          <p><strong>Bid: </strong></p>
          <p><strong>Ask: </strong></p>
          <p><strong>Day high: </strong></p>
          <p><strong>Day low: </strong></p>
          <p><strong>Avg price: </strong></p>
          <p><strong>Prev close: </strong></p>
          <p><strong>Open: </strong></p>
        </div>
        <div class="col">
          <p>${currency.symbol}${quote.bid}</p>
          <p>${currency.symbol}${quote.ask}</p>
          <p>${currency.symbol}${quote.regularMarketDayHigh}</p>
          <p>${currency.symbol}${quote.regularMarketDayLow}</p>
          <p>${currency.symbol}${quote.regularMarketPrice}</p>
          <p>${currency.symbol}${quote.regularMarketPreviousClose}</p>
          <p>${currency.symbol}${quote.regularMarketOpen}</p>
        </div>
        <div class="col">
          <p><strong>Day volume: </strong></p>
          <p><strong>10d volume: </strong></p>
          <p><strong>3mo volume: </strong></p>
        </div>
        <div class="col">
          <p>${quote.regularMarketVolume}</p>
          <p>${quote.averageDailyVolume10Day}</p>
          <p>${quote.averageDailyVolume3Month}</p>
        </div>
      </div>
    </div>
    <hr class="my-2">
    <div id=graph${quote.symbol} class="container-fluid">
    
    </div>

  </div>`, {whiteList: {
    div: ['class'],
    h2: ['class'],
    hr: ['class'],
    p: ['class'],
    a: [],
    small: [],
    strong: []
  }});

  // Save info for later to avoid more calls
  currentlyDisplayed.quote = quote;
  currentlyDisplayed.profile = profile;

  const newQuoteComponent = document.createElement('div');
  newQuoteComponent.id = "quoteDisplayComponent";
  // newQuoteComponent.id = quote.symbol;  
  newQuoteComponent.classList.add("jumbotron")
  newQuoteComponent.innerHTML = html;

  quoteDisplayComponent() ? quoteDisplayCol.replaceChild(newQuoteComponent, quoteDisplayComponent()) : quoteDisplayCol.appendChild(newQuoteComponent)
}

// /////////////
// TOP GAINERS
// /////////////
const populateTopGainersCol = () => {
  // getTopGainers()
  //   .then(response => response.data.quotes)
  //   .then(data => data.forEach(quote => addTopGainer(quote)))
  //   .catch(error => console.log(error))
  
  testData.forEach(quote => addTopGainer(quote))
}

const getTopGainers = () => {
  const options = {
    method: "GET",
    url: "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ga/topgainers",
    params: {start: '0'},
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  }
 return axios.request(options)
}



// Deconstructs one quote object, taking the info we need and adding to list
const addTopGainer = (quote) => {
  let html = xss(

`<div class="d-flex justify-content-between">
    <h6>${quote.symbol}</h6>
    <small class="gain">+$${quote.regularMarketChange.toFixed(2)}</small>
    <small class="gain">+${quote.regularMarketChangePercent.toFixed(2)}%</small>
  </div>
  <small class="mb-0 d-flex longName">${quote.longName}</small>`, {whiteList: {
    div: ['class'],
    h6: [],
    small: ['class'],
    p: ['class'],
  }});

  let newListItem = document.createElement('button')
  newListItem.id = quote.symbol;
  newListItem.classList.add("list-group-item", "list-group-item-action", "align-items-start", "topGainer")
  newListItem.innerHTML = html;

  // Observer pattern, all buttons will trigger same event
  newListItem.addEventListener('click', displayQuote)
  
  topGainersList.appendChild(newListItem)
}


// getTopGainers().then(response => console.log(response.data.quotes))

populateTopGainersCol()

displayQuote()
