const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const game = await Game.insert({
    name: req.body.name,
    system: req.body.system,
  });
  return game;
});
