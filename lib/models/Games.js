const pool = require('../utils/pool');

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
};
