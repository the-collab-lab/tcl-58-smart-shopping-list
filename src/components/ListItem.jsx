import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ name, id, totalPurchases, listToken }) {
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

	return (
		<li className="ListItem">
			<input type="checkbox" id={id} onChange={handleChange}></input>
			<label htmlFor={id}>{name}</label>
		</li>
	);
}
