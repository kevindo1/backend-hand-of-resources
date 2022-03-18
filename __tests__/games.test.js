const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Games');
const res = require('express/lib/response');

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

  it('should get list of games', async () => {
    const game1 = await Game.insert({ name: 'Mario', system: 'Nintendo' });
    const game2 = await Game.insert({ name: 'Luigi', system: 'Nintendo' });

    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual([game1, game2]);
  });

  it('should get game by id', async () => {
    const game = await Game.insert({ name: 'Mario', system: 'Nintendo' });

    const res = await request(app).get(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
  });

  it('should edit by id', async () => {
    const game = await Game.insert({
      name: 'Mario',
      system: 'Nintendo',
    });

    const res = await request(app)
      .patch(`/api/v1/games/${game.id}`)
      .send({ name: 'Luigi', system: 'Nintendo' });

    const expected = await Game.updateById(1, {
      name: 'Luigi',
      system: 'Nintendo',
    });

    expect(res.body).toEqual({ ...expected });
  });
});
