import { IService } from '../../types/Service';

import style from './style.scss';

export const Service = (props: { item: IService }) => (
	<article className={style.serviceWrapper}>
		<header>
			{props.item.name} <span>({props.item.version})</span>
		</header>
	</article>
);
