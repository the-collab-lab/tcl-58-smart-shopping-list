import { ListItem } from '../components';
import { Navigate } from 'react-router-dom';

export function List({ data, listToken }) {
	if (!listToken) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<ListItem key={item.id} name={item.name} />
				))}
			</ul>
		</>
	);
}
