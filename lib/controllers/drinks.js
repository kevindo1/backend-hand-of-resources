const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  // const drink = await Drink.insert({
  //   name: req.body.name,
  //   color: req.body.color,
  // });

  res.send(drink);
});
