import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getMostWatched, getTopGainers } from "../async";
import WatchlistCard from './WatchlistCard';

export default function Watchlist ({ addToQuotelist }) {
	const [watchlist, setWatchlist] = useState([]);

	const setTopGainers = async () => {
		const topGainers = await getTopGainers();
		topGainers && setWatchlist(topGainers);
	};

	const setMostWatched = async () => {
		const mostWatched = await getMostWatched();
		mostWatched && setWatchlist(mostWatched);
	};

	const updateWatchlist = async (e) => e.target.value === "Top gainers" ? setTopGainers() : setMostWatched();

	useEffect(async () => {
		await setTopGainers();
		watchlist.length > 0 && addToQuotelist(watchlist[0]);
	}, []);

	return (
		<div id="watchListCol" class="col-md-4">
			<strong class="m-2">Watchlist</strong>
			<select id="watchListSelect" class="form-control" onChange={updateWatchlist}>
				<option>Top gainers</option>
				<option>Most watched</option>
			</select>
			<ul id="watchList" class="list-group">
				{watchlist.map(item => <WatchlistCard quote={item} addToQuotelist={addToQuotelist} />)}
			</ul>
		</div>
	);
}
