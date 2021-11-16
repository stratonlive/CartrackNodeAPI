const configuration = {
	app: {
		port: 8000, // configure port for server
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers':
				'Content-Type, Authorization, Content-Length, X-Requested-With',
			'Content-Type': 'application.json'
		}
	},
	ratelimit: {
		windowMs: 60, // 60 second
		max: 10 // limit each IP to 10 requests per windowMs
	}
};

module.exports = configuration;
