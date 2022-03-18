const pool = require('../utils/pool');
const Drink = require('./Drinks');

module.exports = class Game {
  id;
  name;
  color;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.system = row.system;
  }

  static async insert({ name, system }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          games(name, system)
        VALUES
          ($1, $2)
        RETURNING
          *
      `,
      [name, system]
    );
    return new Game(rows[0]);
  }

  static async findByAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          games
      `
    );
    return rows.map((row) => new Game(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          games
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;
    return new Game(rows[0]);
  }

  static async updateById(id, attributes) {
    const updatedGame = Game.findById(id);
    const updatedAttributes = { ...updatedGame, ...attributes };
    const { name, system } = updatedAttributes;

    const { rows } = await pool.query(
      `
        UPDATE
          games
        SET
          name=$1,
          system=$2
        WHERE
          id=$3
        RETURNING
          *
      `,
      [name, system, id]
    );

    return new Game(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          games
        WHERE
          id=$1
        RETURNING
          *
      `,
      [id]
    );
    return new Game(rows[0]);
  }
};
