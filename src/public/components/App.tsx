import styled from 'react-emotion';
import { Component } from 'react';
import stream from '../stream';

import { Service } from './Service';
import { IService } from '../types/Service';

const StyledApp = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	padding: 10px;

	margin: -5px;

	background: var(--colour-grey);
`;

export class App extends Component<{}, { items: IService[] }> {
	state = {
		items: [] as IService[]
	};

	componentDidMount() {
		// TODO: See if we can autowire this with Redux or alike
		stream.observable.subscribe(services =>
			this.setState({
				...this.state,
				items: services
			})
		);
	}

	render() {
		return (
			<StyledApp>
				{this.state.items.map(item => (
					<Service item={item} key={item.key} />
				))}
			</StyledApp>
		);
	}
}
