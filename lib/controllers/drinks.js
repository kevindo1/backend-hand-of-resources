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
    const drink = await Drink.findAllBy();
    res.send(drink);
  });
