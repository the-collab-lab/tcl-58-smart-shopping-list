import './AddItem.css';

export function AddItem() {
	return (
		<form className="add-item-form">
			<label htmlFor="item-name">Item name:</label>
			<input type="text" id="item-name" />
			<span>How soon will you buy this again</span>
			<radiogroup>
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
			</radiogroup>
		</form>
	);
}
