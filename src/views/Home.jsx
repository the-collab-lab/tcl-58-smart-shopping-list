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
				{/* the classNames should be for example About-text and for 
				accessibility use a section instead of div*/}
				<p className="first-text">Lorem ipsum dolor sit amet</p>
				{/* change the lorem ipsum to a welcome text and one p tag should be enough */}
				<p className="second-text">
					Lorem ipsum dolor sit amet consectetur, adipisicing elit sit amet .
				</p>
				<p className="third-text">Lorem ipsum.</p>
			</div>

			<form onSubmit={submitShareToken}>
				{/** add className='Join-existing-list' and style it with display:flex,
				 * and column as flex-direction then justify-content: center*/}
				<p className="text-joinanexistingshoppinglist">
					{/* className for p tag can be Join-existing-list__text */}
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
					{' '}
					{/**className for button tag can be Join-existing-list__btn */}
					Join List
				</button>
			</form>
			{errorMessage && <span>errorMessage</span>}

			<div className="createanewlist">
				{/**className should be Create-new-list */}
				<p>Get started by creating a new list</p>
				<button onClick={handleCreateList} className="btn-createanewlist">
					{' '}
					{/**className should be Create-new-list__btn */}
					Create a new list
				</button>
			</div>
		</div>
	);
}
