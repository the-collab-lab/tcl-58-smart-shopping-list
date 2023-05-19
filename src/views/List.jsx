import { ListItem } from '../components';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './List.css';

import '@fortawesome/fontawesome-free/css/all.css';

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

	return (
		<>
			{data?.length > 0 ? (
				<form className="listContainer">
					<div className="search">
						<i className="fas fa-search search-icon"></i>
						<input
							type="search"
							placeholder="Search item..."
							name="search-item"
							id="search-input"
							onChange={handleChange}
						/>
					</div>
				</form>
			) : (
				<div>
					<p>Your shopping list is currently empty!</p>
					<button>
						<Link to="/add-item">Add Item</Link>
					</button>
				</div>
			)}
			<ul className="listContent">
				{filteredItems.map((item) => (
					<ListItem key={item.id} item={item} listToken={listToken} />
				))}
			</ul>
		</>
	);
}
