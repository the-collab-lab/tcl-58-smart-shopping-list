import { Fragment } from 'react';
import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item) => (
					<Fragment key={item.id}>
						<ListItem name={item.name} />
					</Fragment>
				))}
			</ul>
		</>
	);
}
