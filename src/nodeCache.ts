const NodeCache = require('node-cache');
var config = require('./config');

const nodeCache = new NodeCache({
	stdTTL: config.ratelimit.windowMs, // default: 60s
	checkperiod: config.ratelimit.windowMs // default: 60s
});

module.exports = nodeCache;
