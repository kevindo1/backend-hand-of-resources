const pool = require('../utils/pool');

module.exports = class Nba {
  id;
  name;
  coach;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.coach = row.coach;
  }

  static async insert({ name, coach }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          nba (name, coach)
        VALUES
          ($1, $2)
        RETURNING
          *
      `,
      [name, coach]
    );
    const team = new Nba(rows[0]);
    return team;
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          nba
      `
    );
    const team = rows.map((row) => new Nba(row));
    return team;
  }
};
