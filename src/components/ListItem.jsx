import { useEffect, useState } from 'react';
import { updateItem } from '../api/firebase';

import './ListItem.css';

export function ListItem({ item, listToken }) {
	const [isChecked, setIsChecked] = useState(false);

	const {
		name,
		id,
		totalPurchases,
		dateLastPurchased,
		dateNextPurchased,
		dateCreated,
	} = item;

	const handleChange = async (e) => {
		const { checked } = e.target;

		if (checked) {
			try {
				await updateItem(
					listToken,
					id,
					totalPurchases,
					dateLastPurchased,
					dateNextPurchased,
					dateCreated,
				);
				console.log('Shopping item successfully updated');
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		if (dateLastPurchased == null) return;

		const date = dateLastPurchased.toMillis();
		const twentyFourHrs = 24 * 60 * 60 * 1000;

		const hasElapsed = Date.now() - date <= twentyFourHrs;

		setIsChecked(hasElapsed);
	}, [dateLastPurchased]);

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={id}
				onChange={handleChange}
				checked={isChecked}
				disabled={isChecked}
			></input>
			<label htmlFor={id}>{name}</label>
		</li>
	);
}
