import { ReplaySubject, fromEvent } from 'rxjs/index';
import { map } from 'rxjs/operators/index';
import { IService } from './types/Service';

export default new class {
	stream: ReplaySubject<IService[]> = new ReplaySubject();

	constructor() {
		fromEvent<MessageEvent>(new WebSocket('ws://localhost:8080'), 'message')
			.pipe(map(message => JSON.parse(message.data)))
			.subscribe(message => this.stream.next(message));
	}

	get observable() {
		return this.stream.asObservable();
	}
}();
