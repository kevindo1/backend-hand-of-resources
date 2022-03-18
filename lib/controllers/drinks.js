const { Router } = require('express');
const Drink = require('../models/Drinks');

module.exports = Router()
  .post('/', async (req, res) => {
    const drink = await Drink.insert({
      name: req.body.name,
      color: req.body.color,
    });
    res.send(drink);
  })

  .get('/', async (req, res) => {
    const drink = await Drink.findByAll();
    res.send(drink);
  })

  .get('/:id', async (req, res) => {
    const drink = await Drink.findById(req.params.id);
    res.send(drink);
  })

  .patch('/:id', async (req, res) => {
    const drink = await Drink.updateById(req.params.id, req.body);
    res.send(drink);
  });
