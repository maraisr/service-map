import { ReplaySubject } from 'rxjs/index';
import { IService } from './types/Service';

import WebSocket from 'clusterws-client-js';

export default new class {
	protected socket: WebSocket = new WebSocket({
		url: 'ws://localhost:8080'
	});

	stream: ReplaySubject<IService[]> = new ReplaySubject();

	constructor() {
		// Get all data channel events from the socket
		this.socket.on('data', this.stream.next.bind(this.stream));
	}

	get observable() {
		return this.stream.asObservable();
	}
}();
