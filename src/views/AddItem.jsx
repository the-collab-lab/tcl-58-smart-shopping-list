import { useState } from 'react';
import { addItem } from '../api';

import './AddItem.css';

export function AddItem() {
	const [itemToAdd, setItemToAdd] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const docRef = await addItem('po2', {
				itemName: itemToAdd.itemName,
				daysUntilNextPurchase: itemToAdd.buyingFrequency,
			});

			docRef && alert(`${itemToAdd.itemName} was saved to the database`);
			console.log(docRef);
		} catch (err) {
			console.log(err);
			err && alert('item not saved, pls try again');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setItemToAdd({ ...itemToAdd, [name]: value });
	};

	return (
		<>
			<form className="add-item-form" method="post" onSubmit={handleSubmit}>
				<label htmlFor="item-name">Item name:</label>
				<input
					type="text"
					name="itemName"
					id="item-name"
					onChange={handleChange}
				/>
				<span>How soon will you buy this again</span>
				<section>
					<div>
						<input
							type="radio"
							value={7}
							name="buyingFrequency"
							id="soon"
							onChange={handleChange}
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
						/>
						<label htmlFor="not-soon">Not Soon</label>
					</div>
				</section>
				<button>Add Item</button>
			</form>
		</>
	);
}
