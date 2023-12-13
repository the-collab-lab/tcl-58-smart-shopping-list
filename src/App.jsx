import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItem, Home, Layout, List } from './views';
import { getItemData, streamListItems, comparePurchaseUrgency } from './api';
import { useStateWithStorage } from './utils';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

export function App() {
	const [data, setData] = useState([]);
	const [show, setShow] = useState(false);
	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	useEffect(() => {
		if (!listToken) return;
		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database, then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Here, we read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);
			const sortedData = comparePurchaseUrgency(nextData);
			/** Finally, we update our React state. */
			setData(sortedData);
			setShow(true);
		});
	}, [listToken]);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<ArchivalNoticeModal />
							<Layout listToken={listToken} />
						</>
					}
				>
					<Route
						index
						element={<Home setListToken={setListToken} listToken={listToken} />}
					/>
					<Route
						path="/list"
						element={<List data={data} listToken={listToken} show={show} />}
					/>
					<Route
						path="/add-item"
						element={<AddItem listId={listToken} data={data} />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}
