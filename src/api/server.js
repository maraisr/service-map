const ClusterWS = require('clusterws');
const uuid = require('uuid/v4');
const { join } = require('path');
const { readFileSync } = require('fs');
const { parseString } = require('xml2js');
const { createHash } = require('crypto');

const exampleXML = readFileSync(join(__dirname, 'example.xml'), 'utf8');

const clusterws = new ClusterWS({
	port: 8080,
	useBinary: false,
	worker: Worker
});

function Worker() {
	const wss = this.wss;

	wss.on('connection', socket => {
		parseString(exampleXML, (error, result) => {
			socket.send(
				'data',
				getApplicationList(result.applications.application)
			);
		});
	});
}

function getApplicationList(applicationCollection) {
	return applicationCollection
		.map(item => {
			const [name, version = '0.0'] = getNameAndVersion(item.name);

			return {
				key: createHash('sha256')
					.update(name + version)
					.digest('hex'),
				name,
				version,
				instances: compileInstanceNode(item.instance),
				matched: true
			};
		})
		.sort((a, b) => {
			if (a.name > b.name) return 1;
			else if (a.name < b.name) return -1;
			return 0;
		});
}

function compileInstanceNode(instance) {
	return instance.reduce((result, current) => {
		shouldBeArray(current.instanceId).forEach((node, idx) => {
			result.push({
				status: shouldBeArray(current.status)[idx] === 'UP',
				host: shouldBeArray(current.hostName)[idx],
				ip: shouldBeArray(current.ipAddr)[idx],
				port: getPort(current, idx),
				updated: new Date().toISOString()
			});
		});

		return result;
	}, []);
}

function shouldBeArray(item) {
	return Array.isArray(item) ? item : [item];
}

function getNameAndVersion(nameProp) {
	const [, name, version = '0.0'] = shouldBeArray(nameProp)
		.pop()
		.toLowerCase()
		.match(/([a-z\-]+)(?:\-v([0-9\.]+)|$)/);

	return [name, version];
}

function getPort(instance, idx) {
	const port = instance.port[idx];
	const securePort = instance.securePort[idx];

	return securePort['$']['enabled'] === 'true' ? securePort['_'] : port['_'];
}
