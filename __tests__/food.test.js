const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('food route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it.only('should create a food', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Burger',
      calories: '800',
    };
    const res = await request(app)
      .post('/api/v1/food')
      .send({ name: 'burger', calories: '800' });

    expect(res.body).toEqual(expected);
  });
});
