import { useState } from 'react';
import './AddItem.css';

export function AddItem() {
	// const [itemName, setItemName] = useState('');
	// const [itemPurchase, setItemPurchase] = useState(0);

	const handleSubmit = (e) => {
		e.preventDefault();
		// setFormData(e.target.value);
	};
	return (
		<form
			className="add-item-form"
			method="post"
			onSubmit={() => {
				console.log('form submitted');
			}}
		>
			<label htmlFor="item-name">Item name:</label>
			<input type="text" name="item-name" id="item-name" />
			<span>How soon will you buy this again</span>
			<section>
				<div>
					<input
						type="radio"
						value={7}
						name="buying-frequency"
						id="soon"
					></input>
					<label htmlFor="soon">Soon</label>
				</div>
				<div>
					<input
						type="radio"
						value={14}
						name="buying-frequency"
						id="kind-of-soon"
					></input>
					<label htmlFor="kind-of-soon">Kind Of Soon</label>
				</div>
				<div>
					<input
						type="radio"
						value={30}
						name="buying-frequency"
						id="not-soon"
					></input>
					<label htmlFor="not-soon">Not Soon</label>
				</div>
			</section>
			<button>Add Item</button>
		</form>
	);
}
