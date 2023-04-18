import { ListItem } from '../components';
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function List({ data, listToken }) {
	const [searchValue, setSearchValue] = useState('');
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		setItems(data);
	}, [data]);

	useEffect(() => {
		const filteredItems = items.filter((item) =>
			item.name.toLowerCase().includes(searchValue),
		);

		setFilteredItems(filteredItems);
	}, [items, searchValue]);

	function handleChange(event) {
		setSearchValue(event.target.value.toLowerCase());
	}

	if (!listToken) {
		return <Navigate to="/" />;
	}

	return (
		<>
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
			<ul>
				{filteredItems.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
