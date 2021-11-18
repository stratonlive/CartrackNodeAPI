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

			// logging system to log an info message
			log.info(`IP: ${ip} has ${newCount} hits`);
		} else {
			cache.set(ip, count);

			// logging system to log an info message
			log.info(`IP: ${ip} has ${count} hits`);
		}
	} catch (err: any) {
		// logging system to log an error message
		log.err(err.message);
	}
};

module.exports = CacheVerification;
