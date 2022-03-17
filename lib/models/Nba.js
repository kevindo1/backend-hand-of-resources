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
    const { rows } = await pool.query();
  }
};
