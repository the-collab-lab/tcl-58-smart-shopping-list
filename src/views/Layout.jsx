import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ReactComponent as Home } from '../assets/material-symbols_home.svg';
import { ReactComponent as List } from '../assets/material-symbols_format-list-bulleted-rounded.svg';
import { ReactComponent as AddItem } from '../assets/material-symbols_add-notes-outline.svg';

import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout({ listToken }) {
	const [isActive, setIsActive] = useState(-1);

	const navListItems = [
		{ route: '/', label: 'Home', icon: <Home /> },
		{ route: '/list', label: 'List', icon: <List /> },
		{ route: '/add-item', label: 'Add Item', icon: <AddItem /> },
	];
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				{listToken && (
					<nav className="Nav">
						{navListItems.map(({ route, icon, label }, index) => (
							<div
								key={index}
								onMouseEnter={() => setIsActive(index)}
								onMouseLeave={() => setIsActive(-1)}
							>
								<NavLink aria-label={label} to={route} className="Nav-link">
									{icon}
								</NavLink>
								{isActive === index && (
									<span className="Nav-link__label">{label}</span>
								)}
							</div>
						))}
					</nav>
				)}
			</div>
		</>
	);
}
