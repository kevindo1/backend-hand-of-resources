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

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          nba
        WHERE
          id=$1
      `,
      [id]
    );
    if (!rows[0]) return null;

    return new Nba(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingTeam = await Nba.findById(id);
    const updatedAttributes = { ...existingTeam, ...attributes };
    const { name, coach } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        nba
      SET
        name=$1,
        coach=$2
      WHERE
        id=$3
      RETURNING
        *
      `,
      [name, coach, id]
    );

    return new Nba(rows[0]);
  }
};
