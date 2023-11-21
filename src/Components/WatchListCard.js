import { h } from 'preact';
import { unpackQuote } from "../util";

export default function WatchlistCard ({ quote, addToQuotelist }) {
	const { symbol, shortName, longName, regularMarketPrice } = quote;
	const { regularMarketChange, marketChangePercent, currency, down } = unpackQuote(quote);
	
	return (
		<button
			id={symbol}
			onClick={() => addToQuotelist(quote)}
			class="list-group-item list-group-item-action align-items-start watchListElement">
			<div class="d-flex justify-content-between">
				<h6>{symbol}</h6>
				<small class={!down ? "gain" : "loss"}>{!down ? "+" : ''}{currency}{regularMarketChange}</small>
				<small class={!down ? "gain" : "loss"}>{!down ? "+" : ''}{marketChangePercent}%</small>
				<small>{currency}{regularMarketPrice}</small>
			</div>
			<small class="mb-0 d-flex longName">{longName || shortName || "n/a"}</small>
		</button>
	);
}
