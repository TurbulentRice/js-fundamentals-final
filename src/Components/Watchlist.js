import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getMostWatched, getTopGainers } from "../async";
import WatchlistCard from './WatchlistCard';

export default function Watchlist ({ addToQuotelist }) {
	const [watchlist, setWatchlist] = useState([]);

	useEffect(async () => {
		const topGainers = await getTopGainers();
		setWatchlist(topGainers);
		addToQuotelist(topGainers[0]);
	}, []);
	
	const updateWatchList = async (e) => {
		if (e.target.value === "Top gainers") {
			const topGainers = await getTopGainers();
			setWatchlist(topGainers);
		} else {
			const mostWatched = await getMostWatched();
			setWatchlist(mostWatched);
		}
	};

	return (
		<div id="watchListCol" class="col-md-4">
			<strong class="m-2">Watchlist</strong>
			<select id="watchListSelect" class="form-control" onChange={updateWatchList}>
				<option>Top gainers</option>
				<option>Most watched</option>
			</select>
			<ul id="watchList" class="list-group">
				{watchlist.map(item => <WatchlistCard quote={item} addToQuotelist={addToQuotelist} />)}
			</ul>
		</div>
	);
}
