// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const app = require('../app');

describe('Request to API Endpoints', () => {
	it('should get a server response', async () => {
		const res = await request(app).get('/api');
		expect(res.statusCode).toEqual(200);
		expect(JSON.parse(res.text).call).toBe('1 times');
		expect(JSON.parse(res.text).message).toBe('Welcome to cartrack node API');
	});

	it('should get a error route server response', async () => {
		const res = await request(app).get('/');
		expect(res.statusCode).toEqual(404);
		expect(JSON.parse(res.text).message).toBe('Route not found');
	});

	it('should get a throttling api error server response', async () => {
		const fetching = () =>
			request(app)
				.get('/api')
				.then((res: any) => res);

		var call = 10;
		while (call >= 0) {
			// eslint-disable-next-line no-await-in-loop
			await fetching();
			call -= 1;
		}
		const res = await fetching();
		expect(res.statusCode).toEqual(403);
		expect(JSON.parse(res.text).message).toBe(
			'To Many Attempt, try again later!!!'
		);
	});

	it('should get a throttling other route error server response', async () => {
		const fetching = () =>
			request(app)
				.get('/')
				.then((res: any) => res);

		var call = 10;
		while (call >= 0) {
			// eslint-disable-next-line no-await-in-loop
			await fetching();
			call -= 1;
		}
		const res = await fetching();
		expect(res.statusCode).toEqual(403);
		expect(JSON.parse(res.text).message).toBe(
			'To Many Attempt, try again later!!!'
		);
	});
});
