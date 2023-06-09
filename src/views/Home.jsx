import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getItemData, streamListItems } from '../api';

export function Home({ setListToken, listToken }) {
	const [tokenInput, setTokenInput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleCreateList = () => {
		const newToken = generateToken();
		setListToken(newToken);
	};

	if (listToken) {
		return <Navigate to="/list" />;
	}

	const submitShareToken = (e) => {
		e.preventDefault();

		if (tokenInput.length === 0) {
			setErrorMessage('Please enter a token');
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
			return;
		}

		streamListItems(tokenInput, (snapshot) => {
			const nextData = getItemData(snapshot);

			if (nextData.length > 0) {
				setListToken(tokenInput);
			} else {
				setErrorMessage('The list you entered is empty or it does not exist');
				setTimeout(() => {
					setErrorMessage('');
				}, 3000);
			}
		});
	};

	return (
		<div className="Home">
			<p className="about-text">
				Hello ! Welcome to the Smart Shopping List
				<br />
				Smart shopping list, let's you add a list of items, you want to buy.
				<br />
				Enjoy!
			</p>

			<form onSubmit={submitShareToken}>
				<p className="Join-existing-list">Join an existing shopping list</p>
				<label htmlFor="shared-token">Enter Token</label>
				<input
					type="text"
					placeholder="Enter Token..."
					id="shared-token"
					value={tokenInput}
					onChange={(e) => setTokenInput(e.target.value)}
				/>
				<button type="submit" className="Join-existing-list__btn">
					Join List
				</button>
			</form>
			{errorMessage && <span>{errorMessage}</span>}

			<div className="create-new-list">
				{/**className should be Create-new-list */}
				<p>Get started by creating a new list</p>
				<button onClick={handleCreateList} className="Create-new-list__btn">
					{' '}
					{/**className should be Create-new-list__btn */}
					Create a new list
				</button>
			</div>
		</div>
	);
}
