const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  // const drink = await Drink.insert({
  //   name: req.body.name,
  //   color: req.body.color,
  // });
  const drink = { id: '1', name: 'pink lemonade', color: 'pink' };
  res.send(drink);
});
