const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Nba = require('../models/Nba');

describe('backend-hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create NBA team', async () => {
    const expected = {
      name: 'Lakers',
      coach: 'Frank Vogel',
    };
    const res = await request(app).post('/api/v1/nba').send(expected);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Lakers',
      coach: 'Frank Vogel',
    });
  });

  it('should get list of NBA teams', async () => {
    const team1 = {
      name: 'Lakers',
      coach: 'Frank Vogel',
    };
    const team2 = {
      name: '76ers',
      coach: 'Doc Rivers',
    };

    const res = await request(app).get('/api/v1/nba');
  });
});
