const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anime routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add anime', async () => {
    const anime = {
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kugisaki',
    };
    const res = await request(app).post('/api/v1/anime').send(anime);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kugisaki',
    });
  });
});
