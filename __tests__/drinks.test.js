const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drink = require('../lib/models/Drinks');

describe('drink routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should add drink', async () => {
    const drink = {
      name: 'pink lemonade',
      color: 'pink',
    };
    const res = await request(app).post('/api/v1/drinks').send(drink);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'pink lemonade',
      color: 'pink',
    });
  });
});
