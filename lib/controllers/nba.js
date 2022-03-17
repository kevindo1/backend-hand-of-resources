const { Router } = require('express');
const Nba = require('../models/Nba');

module.exports = Router()
  .post('/', async (req, res) => {
    const nba = await Nba.insert({
      name: req.body.name,
      coach: req.body.coach,
    });
    res.send(nba);
  })
  .get('/', async (req, res) => {
    const nba = await Nba.findAll();
    res.send(nba);
  })

  .get('/:id', async (req, res) => {
    const nba = await Nba.findById(req.params.id);
    res.send(nba);
  })

  .patch('/:id', async (req, res) => {
    const nba = await Nba.updateById(req.params.id, req.body);
    res.send(nba);
  })

  .delete('/:id', async (req, res) => {
    const nba = await Nba.deleteById(req.params.id);
    res.send(nba);
  });
