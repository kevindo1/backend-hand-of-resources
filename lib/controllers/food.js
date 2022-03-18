const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router()
  .post('/', async (req, res) => {
    const food = await Food.insert({
      name: req.body.name,
      calories: req.body.calories,
    });

    res.send(food);
  })

  .get('/', async (req, res) => {
    const food = await Food.findByAll();
    res.send(food);
  });
