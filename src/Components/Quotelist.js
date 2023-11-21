import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import QuotelistCard from './QuotelistCard';

export default function Quotelist ({ quotes, profiles, removeFromQuotelist }) {
	const findProfile = (symbol) => profiles.find((profile) => profile.symbol === symbol);
	// Enable Bootstrap popover messages on QuoteCards whenever quotes change
	useEffect(() => $('[data-toggle="popover"]').popover(), [quotes]);
	return (
		<div id="quoteDisplayCol" class="col-md-8 pl-2">
			<strong class="m-2">Search for a quote</strong>
			<div class="input-group">
				<input id="stockTickerInput" type="text" class="form-control" placeholder="AAPL"/>
				<div class="input-group-append">
					<button id="searchBtn" class="btn btn-outline-secondary">Search Stock Tickers</button>
				</div>
			</div>
			{quotes.map((quote) => <QuotelistCard quote={quote} profile={findProfile(quote.symbol)} removeFromQuotelist={removeFromQuotelist}/>)}
		</div>
	);
}
