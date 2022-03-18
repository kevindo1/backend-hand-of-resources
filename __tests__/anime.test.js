const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Anime = require('../lib/models/Anime');

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

  it('should get all animes', async () => {
    const anime1 = await Anime.insert({
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kugisaki',
    });
    const anime2 = await Anime.insert({
      name: 'Demon Slayer',
      character: 'Tanjiro Kamado',
    });
    const res = await request(app).get('/api/v1/anime');
    expect(res.body).toEqual([anime1, anime2]);
  });

  it('should get anime by id', async () => {
    const anime = await Anime.insert({
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kugisaki',
    });
    const res = await request(app).get(`/api/v1/anime/${anime.id}`);
    expect(res.body).toEqual(anime);
  });

  it('should edit anime', async () => {
    const anime = await Anime.insert({
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kugisaki',
    });

    const res = await request(app)
      .patch(`/api/v1/anime/${anime.id}`)
      .send({ name: 'Jujutsu Kaisen', character: 'Nobara' });

    const expected = await Anime.updateById(1, {
      name: 'Jujutsu Kaisen',
      character: 'Nobara',
    });

    expect(res.body).toEqual({ ...expected });
  });

  it('should delete anime', async () => {
    const anime = await Anime.insert({
      name: 'Jujutsu Kaisen',
      character: 'Nobara Kusigaki',
    });

    const res = await request(app).delete('/api/v1/anime/1');

    expect(res.body).toEqual(anime);
    expect(await findById(anime.id)).toBeNull();
  });
});
