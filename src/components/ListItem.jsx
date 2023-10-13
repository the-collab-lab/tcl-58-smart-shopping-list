import { useEffect, useState } from 'react';
import { deleteItem, updateItem } from '../api/firebase';

import './ListItem.css';

export function ListItem({ item, listToken }) {
	const [isChecked, setIsChecked] = useState(false);
	const [message, setMessage] = useState('');

	const {
		name,
		id,
		totalPurchases,
		dateLastPurchased,
		dateNextPurchased,
		dateCreated,
		urgencyLabel,
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
				setMessage('Shopping item successfully updated');
			} catch (error) {
				setMessage('Item has not been marked as purchased');
			}
			setTimeout(() => {
				setMessage('');
			}, 5000);
		}
	};

	const handleDeleteItem = async () => {
		const confirmDelete = window.confirm(
			'Are you sure you want to delete the item',
		);
		if (confirmDelete) {
			try {
				await deleteItem(id, listToken);
			} catch (error) {
				setMessage('item has not been deleted');
				setTimeout(() => {
					setMessage('');
				}, 5000);
			}
		}
	};
	let blueLabel;
	let cyanLabel;
	let greenLabel;
	let redLabel;
	let grayLabel;
	if (urgencyLabel === 'soon') {
		blueLabel = 'blueLabel';
	} else if (urgencyLabel === 'kind of soon') {
		cyanLabel = 'cyanLabel';
	} else if (urgencyLabel === 'not soon') {
		greenLabel = 'greenLabel';
	} else if (urgencyLabel === 'overdue') {
		redLabel = 'redLabel';
	} else {
		grayLabel = 'grayLabel';
	}

	useEffect(() => {
		if (dateLastPurchased == null) return;

		const date = dateLastPurchased.toMillis();
		const twentyFourHrs = 24 * 60 * 60 * 1000;

		const hasElapsed = Date.now() - date <= twentyFourHrs;

		setIsChecked(hasElapsed);
	}, [dateLastPurchased]);

	return (
		<>
			<li className="ListItem">
				<div>
					<input
						className="checkbox"
						type="checkbox"
						id={id}
						onChange={handleChange}
						checked={isChecked}
						disabled={isChecked}
					></input>
					<label className="shoppingItem" htmlFor={id}>
						{name}
					</label>
				</div>

				<div className="rightContainer">
					<label
						className={`${grayLabel} ${blueLabel} ${cyanLabel} ${redLabel} ${greenLabel}`}
						htmlFor={id}
					>
						{urgencyLabel}
					</label>
					<button aria-label="Delete item" onClick={handleDeleteItem}>
						<i className="fas fa-trash-alt delete-icon"></i>
					</button>
				</div>
			</li>
			{message && <span>{message}</span>}
		</>
	);
}
