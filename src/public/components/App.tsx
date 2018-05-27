import styled from 'react-emotion';
import { Component } from 'react';

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
		items: [
			{
				key: 1,
				name: 'car-service',
				version: 'V3.1',
				up: true
			},
			{
				key: 2,
				name: 'home-service',
				version: 'V2.0',
				up: false
			},
			{
				key: 3,
				name: 'some-really-long-service-name-service',
				version: 'V2.0',
				up: false
			}
		]
	};

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
