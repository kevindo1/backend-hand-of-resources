const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create NBA team', async () => {
    const res = await request(app)
      .post('/api/v1/nba')
      .send({ name: 'Lakers', coach: 'Frank Vogel' });

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Lakers',
      coach: 'Frank Vogel',
    });
  });
});
