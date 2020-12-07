import * as currencySymbols from "./currencySymbols.json"
export const xss = require("xss")

export const makeStockChartComponent = (history) => {
  
  
  return newChartComponent;
}

export const makeWatchListElement = (quote) => {
  let down = quote.regularMarketChange < 0;
  let html = xss(
  `<div class="d-flex justify-content-between">
    <h6>${quote.symbol}</h6>
    <small class="${!down ? "gain" : "loss"}">${!down ? "+" : ''}${currencySymbols[quote.currency].symbol + quote.regularMarketChange.toFixed(2)}</small>
    <small class="${!down ? "gain" : "loss"}">${!down ? "+" : ''}${quote.regularMarketChangePercent.toFixed(2)}%</small>
  </div>
  <small class="mb-0 d-flex longName">${quote.longName}</small>`, {whiteList: {
    div: ['class'],
    h6: [],
    small: ['class'],
    p: ['class'],
  }});

  let newListItem = document.createElement('button')
  newListItem.id = quote.symbol;
  newListItem.classList.add("list-group-item", "list-group-item-action", "align-items-start", "watchListElement")
  newListItem.innerHTML = html;
  return newListItem;
}

export const makeQuoteDisplayComponent = (quote, profile) => {
  const currency = currencySymbols[quote.currency]
  let down = quote.regularMarketChange < 0;
  let html = xss(
    `<div class="d-flex justify-content-between">
      <h2 class="display-4">${quote.symbol}</h2>
      <h4 class="mt-3">${currency.symbol}${quote.regularMarketPrice}</h4>
      <h6 class="${!down ? "gain" : "loss"} mt-4">${!down ? "+" : ''}${currency.symbol + quote.regularMarketChange.toFixed(2)}</h4>
      <h6 class="${!down ? "gain" : "loss"} mt-4">${!down ? "+" : ''}${quote.regularMarketChangePercent.toFixed(2)}%</h4>
    </div>
    <div class="d-flex justify-content-between">
      <p class="lead mb-1">${quote.longName}</p>

    </div>
    <div class="d-flex justify-content-between">
      <p><small>${profile.industry}, ${profile.sector}</small></p>
      <p><small>${profile.city}, ${profile.country} (${quote.currency})</small></p>
    </div>

    <hr class="mt-0">
    <div id="quoteTable" class="container-fluid">
      <div class="row">
        <div class="col small">
          <p><strong>Day high: </strong></p>
          <p><strong>Day low: </strong></p>
          <p><strong>Prev close: </strong></p>
          <p><strong>Open: </strong></p>
        </div>
        <div class="col small">
          <p>${currency.symbol}${quote.regularMarketDayHigh}</p>
          <p>${currency.symbol}${quote.regularMarketDayLow}</p>
          <p>${currency.symbol}${quote.regularMarketPreviousClose}</p>
          <p>${currency.symbol}${quote.regularMarketOpen}</p>
        </div>
        <div class="col small">
          <p><strong>Day volume: </strong></p>
          <p><strong>10d volume: </strong></p>
          <p><strong>3mo volume: </strong></p>
        </div>
        <div class="col small">
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
    button: ['type', 'class', 'data-toggle', 'data-content'],
    div: ['class'],
    h2: ['class'],
    h4: ['class'],
    h6: ['class'],
    hr: ['class'],
    p: ['class'],
    a: [],
    small: ['class'],
    strong: []
  }});

  const newQuoteComponent = document.createElement('div');
  newQuoteComponent.id = "quoteDisplayComponent";
  // newQuoteComponent.id = quote.symbol;  
  newQuoteComponent.classList.add("jumbotron", "quoteDisplayComponent")
  newQuoteComponent.innerHTML = html;
  return newQuoteComponent;
}