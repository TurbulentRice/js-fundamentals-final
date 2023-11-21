import * as currencySymbols from "./currencySymbols.json";

// Utility function for easy access to quote object data
export const unpackQuote = (quote) => ({
	regularMarketChange: quote.regularMarketChange?.toFixed(2) || "n/a",
	marketChangePercent: quote.regularMarketChangePercent?.toFixed(2) || "n/a",
	currency: currencySymbols[quote.currency]?.symbol || '',
	down: quote.regularMarketChange < 0
});
