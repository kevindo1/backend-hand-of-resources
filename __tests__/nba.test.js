const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Nba = require('../lib/models/Nba');
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
    const team1 = await Nba.insert({
      name: 'Lakers',
      coach: 'Frank Vogel',
    });
    const team2 = await Nba.insert({
      name: '76ers',
      coach: 'Doc Rivers',
    });

    const res = await request(app).get('/api/v1/nba');
    expect(res.body).toEqual(expect.arrayContaining([team1, team2]));
  });

  it('should get individual team by id', async () => {
    const team = await Nba.insert({
      name: 'Lakers',
      coach: 'Frank Vogel',
    });
    const res = await request(app).get(`/api/v1/nba/${team.id}`);

    expect(res.body).toEqual(team);
  });
});
