const pool = require('../utils/pool');

module.exports = class Anime {
  id;
  name;
  character;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.character = row.character;
  }

  static async insert({ name, character }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          anime(name, character)
        VALUES
          ($1, $2)
        RETURNING
          *
      `,
      [name, character]
    );
    return new Anime(rows[0]);
  }

  static async findByAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          anime;
      `
    );
    return rows.map((row) => new Anime(row));
  }
};
