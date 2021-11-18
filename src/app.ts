const http = require('http');
const logger = require('./logger').Logger;
var config = require('./config');
const caching = require('./nodeCache');
var verifyCache = require('./verifyCache');

type RequestType = {
	socket: any;
	url: string;
	header: any;
};

const server = http.createServer((req: RequestType, res: any) => {
	var counthits;
	var ip = req.socket.remoteAddress;

	if (req.url === '/api') {
		verifyCache(ip);
		counthits = caching.get(ip);
		if (counthits >= 10) {
			logger.info(`IP: ${ip} has been blocked`);
			res.writeHead(403, config.app.headers);
			res.end(
				JSON.stringify({ message: 'To Many Attempt, try again later!!!' })
			);
		} else {
			res.writeHead(200, config.app.headers);
			res.end(
				JSON.stringify({
					message: 'Welcome to cartrack node API',
					call: `${counthits} times`
				})
			);
		}
	} else {
		verifyCache(ip);
		counthits = caching.get(ip);
		if (counthits >= 10) {
			logger.info(`IP: ${ip} has been blocked`);
			res.writeHead(403, config.app.headers);
			res.end(
				JSON.stringify({ message: 'To Many Attempt, try again later!!!' })
			);
		} else {
			res.writeHead(404, config.app.headers);
			res.end(JSON.stringify({ message: 'Route not found' }));
		}
	}
});

server.listen(config.app.port, () =>
	console.log(`server is running on port ${config.app.port}`)
);

module.exports = server;
