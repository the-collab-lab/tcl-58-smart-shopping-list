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
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleCreateList}>Create a new list</button>
			<form onSubmit={submitShareToken}>
				<p>- or -</p>
				<p>Join an existing shopping list by entering a three word token.</p>
				<label htmlFor="shared-token">Share token</label>
				<input
					type="text"
					id="shared-token"
					value={tokenInput}
					onChange={(e) => setTokenInput(e.target.value)}
				/>
				<button type="submit">Join an existing list</button>
			</form>
			{errorMessage && errorMessage}
		</div>
	);
}
