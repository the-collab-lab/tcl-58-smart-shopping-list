import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { ListItem } from '../components';
import LoadingSpinner from '../components/LoadingSpinner';
import { ReactComponent as SadFace } from '../assets/fluent_emoji-sad-20-regular.svg';

import './List.css';

export function List({ data, listToken, show }) {
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
			{data?.length < 1 && !show && <LoadingSpinner />}
			{data?.length > 0 && (
				<div>
					<form className="listContainer">
						<div className="search">
							<i className="fas fa-search search-icon"></i>
							<input
								type="search"
								aria-label="Search"
								placeholder="Search item..."
								name="search-item"
								id="search-input"
								onChange={handleChange}
							/>
						</div>
					</form>
					<ul className="listContent">
						{filteredItems.map((item) => (
							<ListItem key={item.id} item={item} listToken={listToken} />
						))}
					</ul>
				</div>
			)}

			{show && data?.length < 1 && (
				<div className="Empty-shopping-list">
					<SadFace />
					<p>Your shopping list is currently empty!</p>
					<Link to="/add-item" className="Empty-shopping-list__add-item">
						Add Item
					</Link>
				</div>
			)}
		</>
	);
}
