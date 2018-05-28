import { Component } from 'react';
import stream from '../../stream';

import { Service } from '../Service';
import { IService } from '../../types/Service';

import style from './style.scss';

export class App extends Component<{}, { items: IService[] }> {
	state = {
		items: [] as IService[]
	};

	componentDidMount() {
		// TODO: See if we can autowire this with Redux or alike
		stream.observable.subscribe(items =>
			this.setState({
				...this.state,
				items
			})
		);
	}

	render() {
		return (
			<div className={style.app}>
				{this.state.items.map(item => (
					<Service item={item} key={item.key} />
				))}
			</div>
		);
	}
}
