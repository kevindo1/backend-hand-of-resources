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

  it('should add drink', async () => {
    const drink = {
      name: 'pink lemonade',
      color: 'pink',
    };
    const res = request(app).post('/api/v1/drinks').send(drink);

    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'pink lemonade',
      color: 'pink',
    });
  });
});
