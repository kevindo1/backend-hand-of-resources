const { Router } = require('express');
const Game = require('../models/Games');

module.exports = Router()
  .post('/', async (req, res) => {
    const game = await Game.insert({
      name: req.body.name,
      system: req.body.system,
    });
    res.send(game);
  })

  .get('/', async (req, res) => {
    const game = await Game.findByAll();
    res.send(game);
  });
