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

  static async findByAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          food
      `
    );
    const food = rows.map((row) => new Food(row));
    return food;
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM 
          food
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;

    const food = new Food(rows[0]);
    return food;
  }

  static async updateById(id, attributes) {
    const existingFood = await Food.findById(id);
    const updatedAttributes = { ...existingFood, ...attributes };
    const { name, calories } = updatedAttributes;
    const { rows } = await pool.query(
      `
        UPDATE
          food
        SET
          name=$1,
          calories=$2
        WHERE
          id=$3
        RETURNING
          *
      `,
      [name, calories, id]
    );
    return new Food(rows[0]);
  }
};
