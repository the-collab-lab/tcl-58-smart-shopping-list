import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { Navigate } from 'react-router-dom';

export function Home({ setListToken, listToken }) {
	const handleCreateList = () => {
		const newToken = generateToken();
		setListToken(newToken);
	};

	if (listToken) {
		return <Navigate to="/list" />;
	}

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleCreateList}>Create a new list</button>
		</div>
	);
}
