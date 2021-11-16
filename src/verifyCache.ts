const cache = require('./nodeCache');
const log = require('./logger').Logger;

const CacheVerification = (ip: any) => {
	var count = 1;
	var newCount;
	try {
		if (cache.has(ip)) {
			count = cache.get(ip);
			newCount = count + 1;
			cache.set(ip, newCount);
			console.log(`${ip} has ${newCount} hits`);

			// logging system to log an info message
			log.info(`IP: ${ip} has ${newCount} hits`);
		} else {
			cache.set(ip, count);
			console.log(`${ip} has ${count} hits`);

			// logging system to log an info message
			log.info(`IP: ${ip} has ${count} hits`);
		}
	} catch (err: any) {
		console.log(err);
		// logging system to log an error message
		log.err(err);
	}
};

module.exports = CacheVerification;
