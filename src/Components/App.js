import { h } from 'preact';
import { useState } from 'preact/hooks';
import Watchlist from './Watchlist';
import Quotelist from './Quotelist';
import { getProfile } from '../async';

export default function App () {
	const [quotes, setQuotes] = useState([]);
	const [profiles, setProfiles] = useState([]);

	const addToQuotelist = async (quote) => {
		const profile = await getProfile(quote.symbol);
		if (profile) {
			profile.symbol = quote.symbol;
			setProfiles([...profiles, profile]);
		}
		setQuotes([...quotes, quote]);
	};

	const removeFromQuotelist = (symbol) => {
		const newQuotes = quotes.filter((quote) => quote.symbol !== symbol);
		const newProfiles = profiles.filter((profile) => profile.symbol !== symbol);
		setQuotes(newQuotes);
		setProfiles(newProfiles);
	};

	console.log('QUOTES:', quotes)
	console.log('PROFILES:', profiles)
	return (
		<div id="root" class="container-fluid m-1">
			<div id="header" class="d-flex justify-content-center m-4">
        <img src="./assets/shuttle.svg" height="30" class="mr-2"/>
        <h2>Stock Rocket</h2>
        <p></p>
      </div>

      <hr class="m-2"/>

      <div id="row1" class="row">
        <Watchlist addToQuotelist={addToQuotelist}/>
				<Quotelist quotes={quotes} profiles={profiles} removeFromQuotelist={removeFromQuotelist}/>
      </div>
		</div>
	);
}
