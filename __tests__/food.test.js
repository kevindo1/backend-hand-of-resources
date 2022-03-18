const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Food = require('../lib/models/Food');
const { findById } = require('../lib/models/Nba');

describe('food route', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a food', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Burger',
      calories: '800',
    };
    const res = await request(app).post('/api/v1/food').send(expected);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Burger',
      calories: '800',
    });
  });

  it('should get a list of food', async () => {
    const food1 = await Food.insert({
      name: 'Burger',
      calories: '800',
    });
    const food2 = await Food.insert({
      name: 'Salmon',
      calories: '400',
    });

    const res = await request(app).get('/api/v1/food');
    expect(res.body).toEqual(expect.arrayContaining([food1, food2]));
  });

  it('should get a food by id', async () => {
    const food = await Food.insert({
      name: 'Burger',
      calories: '800',
    });

    const res = await request(app).get(`/api/v1/food/${food.id}`);
    expect(res.body).toEqual(food);
  });

  it('should edit food', async () => {
    const food = await Food.insert({
      name: 'Burger',
      calories: '800',
    });

    const res = await request(app)
      .patch('/api/v1/food')
      .send({ name: 'Burger', calories: '700' });

    const expected = {
      id: expect.any(String),
      name: 'Burger',
      branch: '700',
    };

    expect(res.body).toEqual(expected);
    expect(await findById(food.id)).toEqual(expected);
  });
});
