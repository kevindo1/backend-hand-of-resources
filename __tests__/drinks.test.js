const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Drink = require('../lib/models/Drinks');
const { updateById, findById } = require('../lib/models/Drinks');

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

  it('should return list of drinks', async () => {
    const drink1 = await Drink.insert({ name: 'pink lemonade', color: 'pink' });
    const drink2 = await Drink.insert({ name: 'water', color: 'clear' });

    const res = await request(app).get('/api/v1/drinks');
    expect(res.body).toEqual([drink1, drink2]);
  });

  it('should return drink by id', async () => {
    const drink = await Drink.insert({ name: 'pink lemonade', color: 'pink' });

    const res = await request(app).get('/api/v1/drinks/1');
    expect(res.body).toEqual(drink);
  });

  it('should edit drink', async () => {
    const drink = await Drink.insert({ name: 'pink lemonade', color: 'pink' });

    const res = await request(app)
      .patch(`/api/v1/drinks/${drink.id}`)
      .send({ name: 'pink lemonade', color: 'blue' });

    const expected = await Drink.updateById(1, {
      name: 'pink lemonade',
      color: 'blue',
    });

    expect(res.body).toEqual({ ...expected });
  });

  it('should delete drink', async () => {
    const drink = await Drink.insert({ name: 'pink lemonade', color: 'pink' });

    const res = await request(app).delete('/api/v1/drinks/1');

    expect(res.body).toEqual(drink);
    expect(await findById(drink.id)).toBeNull();
  });
});
