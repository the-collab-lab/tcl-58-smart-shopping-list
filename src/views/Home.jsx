import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ setListToken }) {
	const handleCreateList = () => {
		const newToken = generateToken();
		console.log(newToken);
		setListToken(newToken);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<button onClick={handleCreateList}>Create a new list</button>
		</div>
	);
}
