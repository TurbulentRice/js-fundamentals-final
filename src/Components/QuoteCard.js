import { cleanHTML, unpackQuote } from "../util";

export default function QuoteCard (quote, profile) {
	const {regMarketChange, marketChangePercent, currency, down} = unpackQuote(quote);

	let html = cleanHTML(
		`<div class="d-flex justify-content-between pl-3">
			<h2 class="display-4 m-0">${quote.symbol}</h2>
			<h4 class="mt-3">${currency}${quote.regularMarketPrice}</h4>
			<h6 class="${!down ? "gain" : "loss"} mt-4">${!down ? "+" : ''}${currency}${regMarketChange}</h4>
			<h6 class="${!down ? "gain" : "loss"} mt-4">${!down ? "+" : ''}${marketChangePercent}%</h4>
		</div>

		<div class="d-flex justify-content-between pl-3">
			<p class="lead mb-0">${quote.longName || quote.shortName}</p>
			<button title="Remove quote card" type="button" class="btn btn-sm text-center removeQuoteComponentBtn" data-symbol="${quote.symbol}">
				<svg width="1.5em" height="1.5em" class="bi bi-trash" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
					<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
					<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
				</svg>
			</button>
		</div>

		<div class="d-flex justify-content-between mt-0 pt-0 pl-3">
			<p><small>${profile.industry || "industry n/a"}, ${profile.sector || "sector n/a"}</small></p>
			<p><small>${profile.city || "city n/a"}, ${profile.country || "country n/a"} (${quote.currency})</small></p>
			<p>
				<button title="${quote.symbol} company info" type="button" id="${quote.symbol}InfoBtn" class="btn btn-link btn-sm p-0 mb-0"
					data-symbol="${quote.symbol}" data-placement="left" data-content="${profile.longBusinessSummary || "n/a"}"
					data-toggle="popover" data-trigger="focus">
					Company info
				</button>
			</p>
		</div>

		<hr class="mt-0 ml-3">

		<div id="quoteTable" class="container-fluid">
			<div class="row">
				<div class="col small">
					<p><strong>Day high: </strong></p>
					<p><strong>Day low: </strong></p>
					<p><strong>Open: </strong></p>
				</div>
				<div class="col small">
					<p>${currency}${quote.regularMarketDayHigh}</p>
					<p>${currency}${quote.regularMarketDayLow}</p>
					<p>${currency}${quote.regularMarketOpen}</p>
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

		<hr class="mt-0 mb-1 ml-3">

		<div class="d-flex justify-content-left ml-3">
			<button id="${quote.symbol}ShowChartBtn" type="button" class="btn btn-link btn-sm showChartBtn p-0 mb-0" data-symbol="${quote.symbol}">
				Show chart
			</button>
		</div>

		<div id="${quote.symbol}ChartDiv" class="mt-1" style="display:none; height: 360px; width: 100%" data-symbol="${quote.symbol}">
		</div>`
	);

	const newQuoteComponent = document.createElement('div');
	newQuoteComponent.id = `${quote.symbol}'QuoteComponent'`;
	newQuoteComponent.setAttribute('data-symbol', quote.symbol);
	newQuoteComponent.classList.add("jumbotron", "quoteDisplayComponent", "pt-3", "pb-2", "pl-2");
	newQuoteComponent.innerHTML = html;
	return newQuoteComponent;
}