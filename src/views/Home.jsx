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
			<div className="about-text">
				<p className="first-text">Lorem ipsum dolor sit amet</p>
				<p className="second-text">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit sit amet .
				</p>
				<p className="third-text">Lorem ipsum.</p>
			</div>

			<form onSubmit={submitShareToken}>
				<p className="text-joinanexistingshoppinglist">
					Join an existing shopping list
				</p>
				<label htmlFor="shared-token">Enter Token</label>
				<input
					type="text"
					placeholder="Enter Token..."
					id="shared-token"
					value={tokenInput}
					onChange={(e) => setTokenInput(e.target.value)}
				/>
				<button type="submit" className="btn-joinanexistinglist">
					Join List
				</button>
			</form>
			{errorMessage && errorMessage}

			<div className="createanewlist">
				<p>Get started by creating a new list</p>
				<button onClick={handleCreateList} className="btn-createanewlist">
					Create a new list
				</button>
			</div>
		</div>
	);
}
