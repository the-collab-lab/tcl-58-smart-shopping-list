import { ListItem } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addItem } from '../api';

export function List({ data, listToken }) {
	const [searchValue, setSearchValue] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		const newFilteredItems = data.filter((item) =>
			item.name.toLowerCase().includes(searchValue),
		);

		setFilteredItems(newFilteredItems);
	}, [data, searchValue]);

	function handleChange(event) {
		setSearchValue(event.target.value.toLowerCase());
	}

	if (!listToken) {
		return <Navigate to="/" />;
	}

	// const additemHandler = () => {
	// 	return < Navigate to = '/add-item' />
	// }

	return (
		<>
			{data.length > 0 ? (
				<form>
					<label htmlFor="search-input"> Filter items </label>
					<input
						type="search"
						placeholder="Start typing here..."
						name="search-item"
						id="search-input"
						onChange={handleChange}
					/>
				</form>
			) : (
				<div>
					<p>Your shopping list is currently empty.</p>
					<button>
						<Link to="/add-item">Add Item</Link>
					</button>
				</div>
			)}
			<ul>
				{filteredItems.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
