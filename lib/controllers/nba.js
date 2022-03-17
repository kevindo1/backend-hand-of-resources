const { Router } = require('express');
const Nba = require('../models/Nba');

module.exports = Router().post('/', async (req, res) => {
  const nba = await Nba.insert({
    name: req.body.name,
    coach: req.body.coach,
  });
  res.send(nba);
});
