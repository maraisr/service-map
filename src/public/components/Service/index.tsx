import { IService } from '../../types/Service';
const copy = require('clipboard-copy');

import style from './style.scss';

export const Service = (props: { item: IService }) => (
	<article
		className={[
			style.serviceItem,
			props.item.matched &&
			props.item.instances.some(item => !item.status)
				? style.serviceItemDown
				: style.serviceItemUp
		]
			.filter(Boolean)
			.join(' ')}
	>
		<header>
			<h1>{props.item.name}</h1> <span>({props.item.version})</span>
		</header>

		<main>
			<ul>
				{props.item.instances.map(node => (
					<li
						key={node.ip}
						className={style.serviceMeta}
						onClick={() => copyToClipboard(node.ip, node.port)}
					>
						<div className={style.serviceHost}>{node.host}</div>
						<div className={style.serviceStatus}>
							{node.status ? 'UP' : 'DOWN'}
						</div>
					</li>
				))}
			</ul>
		</main>
	</article>
);

function copyToClipboard(ip: string, port: string) {
	copy(`${ip}:${port}`);
}
