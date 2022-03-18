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
  })

  .get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);
    res.send(game);
  })

  .patch('/:id', async (req, res) => {
    const game = await Game.updateById(req.params.id, req.body);
    res.send(game);
  })

  .delete('/:id', async (req, res) => {
    const game = await Game.deleteById(req.params.id);
    res.send(game);
  });
