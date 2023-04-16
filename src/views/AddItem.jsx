import { useState } from 'react';
import { addItem } from '../api';
import { Navigate } from 'react-router-dom';

import './AddItem.css';

export function AddItem({ listId }) {
	const [itemToAdd, setItemToAdd] = useState({
		itemName: '',
		buyingFrequency: 7,
	});
	const [message, setMessage] = useState('');

	if (!listId) {
		return <Navigate to="/" />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const docRef = await addItem(listId, {
				itemName: itemToAdd.itemName,
				daysUntilNextPurchase: itemToAdd.buyingFrequency,
			});

			if (docRef) {
				setMessage(`${itemToAdd.itemName} was saved to the database`);

				setTimeout(() => {
					setMessage('');
				}, 5000);

				setItemToAdd({ itemName: '', buyingFrequency: 7 });
			}
		} catch (err) {
			err && setMessage('item not saved, pls try again');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setItemToAdd((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<>
			{message && <span>{message}</span>}
			<form className="add-item-form" method="post" onSubmit={handleSubmit}>
				<label htmlFor="item-name">Item name:</label>
				<input
					type="text"
					name="itemName"
					id="item-name"
					value={itemToAdd.itemName}
					onChange={handleChange}
				/>
				<fieldset>
					<legend>How soon will you buy this again</legend>
					<div>
						<input
							type="radio"
							value={7}
							name="buyingFrequency"
							id="soon"
							onChange={handleChange}
							// defaultChecked
							checked={itemToAdd.buyingFrequency === 7}
						/>
						<label htmlFor="soon">Soon</label>
					</div>
					<div>
						<input
							type="radio"
							value={14}
							name="buyingFrequency"
							id="kind-of-soon"
							onChange={handleChange}
							checked={itemToAdd.buyingFrequency === 14}
						/>
						<label htmlFor="kind-of-soon">Kind Of Soon</label>
					</div>
					<div>
						<input
							type="radio"
							value={30}
							name="buyingFrequency"
							id="not-soon"
							onChange={handleChange}
							checked={itemToAdd.buyingFrequency === 30}
						/>
						<label htmlFor="not-soon">Not Soon</label>
					</div>
				</fieldset>
				<button>Add Item</button>
			</form>
		</>
	);
}
