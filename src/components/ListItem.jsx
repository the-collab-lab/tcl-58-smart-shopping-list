import { updateItem } from '../api/firebase';
import './ListItem.css';

export function ListItem({
	name,
	id,
	totalPurchases,
	listToken,
	dateLastPurchased,
}) {
	const handleChange = async (e) => {
		const { checked } = e.target;

		if (checked) {
			totalPurchases++;
			try {
				await updateItem(listToken, id, totalPurchases);
				console.log('Shopping item successfully updated');
			} catch (error) {
				console.log(error);
			}
		}
	};

	const compareDates = () => {
		if (dateLastPurchased == null) return;

		const date = dateLastPurchased.toMillis();
		const twentyFourhrs = 24 * 60 * 60 * 1000;

		return Date.now() - date <= twentyFourhrs;
	};

	console.log(name + ' ' + !!compareDates());

	return (
		<li className="ListItem">
			<input
				type="checkbox"
				id={id}
				onChange={handleChange}
				// checked={}
				// disabled={}
			></input>
			<label htmlFor={id}>{name}</label>
		</li>
	);
}
