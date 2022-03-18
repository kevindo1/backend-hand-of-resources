const pool = require('../utils/pool');

module.exports = class Drink {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
  }

  static async insert({ name, color }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          drinks(name, color)
        VALUES
          ($1, $2)
        RETURNING
          *
      `,
      [name, color]
    );
    return new Drink(rows[0]);
  }

  static async findByAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          drinks
      `
    );
    return rows.map((row) => new Drink(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM 
          drinks
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Drink(rows[0]);
  }

  static async updateById(id, attributes) {
    const updatedDrink = Drink.findById(id);
    const updatedAttributes = { ...updatedDrink, ...attributes };
    const { name, color } = updatedAttributes;

    const { rows } = await pool.query(
      `
        UPDATE
          drinks
        SET
          name=$1,
          color=$2
        WHERE
          id=$3
        RETURNING
          *       
      `,
      [name, color, id]
    );
    return new Drink(rows[0]);
  }
};
