import { cleanHTML, unpackQuote } from "../util";

export default function WatchListCard (quote) {
	const {regMarketChange, marketChangePercent, currency, down} = unpackQuote(quote);

	let html = cleanHTML(
		`<div class="d-flex justify-content-between">
			<h6>${quote.symbol}</h6>
			<small class="${!down ? "gain" : "loss"}">${!down ? "+" : ''}${currency}${regMarketChange}</small>
			<small class="${!down ? "gain" : "loss"}">${!down ? "+" : ''}${marketChangePercent}%</small>
			<small>${currency}${quote.regularMarketPrice}</small>
		</div>
		<small class="mb-0 d-flex longName">${quote.longName || quote.shortName || "n/a"}</small>`
	);

	let newListItem = document.createElement('button');
	newListItem.id = quote.symbol;
	newListItem.classList.add("list-group-item", "list-group-item-action", "align-items-start", "watchListElement");
	newListItem.innerHTML = html;
	return newListItem;
}
