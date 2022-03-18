const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('games routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a game', async () => {
    const game = { name: 'Mario', system: 'Nintendo' };
    const res = await request(app).post('/api/v1/games').send(game);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Mario',
      system: 'Nintendo',
    });
  });
});
