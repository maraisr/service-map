// TODO: This code is all mega poc, just to test the waters, probably need to serve dist from this script too
// TODO: Make this thing typscript

const WebSocket = require('ws');
const uuid = require('uuid/v4');

const ws = new WebSocket.Server({
	port: 8080,
	perMessageDeflate: {
		zlibDeflateOptions: {
			chunkSize: 1024,
			memLevel: 7,
			level: 3
		},
		zlibInflateOptions: {
			chunkSize: 10 * 1024
		}
	}
});

const testString = [
	{
		key: uuid(),
		name: 'car-service',
		version: 'V3.1',
		get up() {
			return Math.random() >= 0.5;
		}
	},
	{
		key: uuid(),
		name: 'home-service',
		version: 'V2.0',
		get up() {
			return Math.random() >= 0.5;
		}
	},
	{
		key: uuid(),
		name: 'some-really-long-service-name-service',
		version: 'V2.0',
		get up() {
			return Math.random() >= 0.5;
		}
	}
];

ws.on('connection', function(conn) {
	conn.send(JSON.stringify(testString));

	setInterval(() => conn.send(JSON.stringify(testString)), 3000);
});
