const supertest = require('supertest');
const server = require('../api/server');
const db = require('../database/dbconfig');

beforeEach(async () => {
	await db.seed.run();
});

// fixes teardown warning
afterAll(async () => {
	await db.destroy();
});

describe('auth-router tests', () => {
	it('Registers user', async () => {
		const data = { username: 'new', password: '123abc' };
		const res = await supertest(server).post('/api/auth/register').send(data);
		expect(res.statusCode).toBe(201);
	});

	it('User already exists', async () => {
		const data = { username: 'Joe', password: '123abc' };
		const res = await supertest(server).post('/api/auth/register').send(data);
		expect(res.statusCode).toBe(409);
	});

	it('Fails to register', async () => {
		const data = { username: 'test', password: '123abc' };
		const res = await supertest(server).post('/api/register/').send(data);
		expect(res.statusCode).toBe(404);
	});

	it('Login successful', async () => {
		const res = await supertest(server)
			.post('/api/auth/login')
			.set('Content-Type', 'application/json')
			.send({ username: 'Joe', password: 'abc123' });
		expect(200);
	});

	it('Login failed', async () => {
		const data = { username: 'Joe', password: '123xyz' };
		const res = await supertest(server).post('/api/auth/login').send(data);
		expect(res.statusCode).toBe(401);
	});

	it('Jokes returns a 404 status code', () => {
		return supertest(server).get('/').expect(404);
	});

	it('returns invalid message', () => {
		return supertest(server)
			.get('/api/auth/jokes')
			.then((res) => {
				expect(res.body.message).toBe('You shall not pass!');
			});
	});
});
