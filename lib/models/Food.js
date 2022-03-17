const pool = require('../utils/pool');

module.exports = class Food {
  id;
  name;
  calories;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.calories = row.calories;
  }

  static async insert({ name, calories }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          food (name, calories)
        VALUES 
          ($1, $2)
        RETURNING 
          *
      `,
      [name, calories]
    );
    const food = new Food(rows[0]);
    return food;
  }
};
