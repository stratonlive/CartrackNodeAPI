const cachetest = require('../nodeCache');
var verifyCache = require('../verifyCache');

const ip = '192.168.0.12';

describe('Cache function test', () => {
	test('verify set/get cache per IP', () => {
		const count = 1;
		cachetest.set(ip, count);
		expect(cachetest.get(ip)).toBe(1);
	});

	test('verify count increment cache per IP', () => {
		for (let i = 1; i < 10; i++) {
			cachetest.set(ip, i);
			expect(cachetest.get(ip)).toBe(i);
		}
	});

	test('verify cache hit function', () => {
		verifyCache(ip);
		expect(cachetest.get(ip)).toBe(10);
	});
});
