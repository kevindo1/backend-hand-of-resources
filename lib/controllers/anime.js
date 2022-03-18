const { Router } = require('express');
const Anime = require('../models/Anime');

module.exports = Router()
  .post('/', async (req, res) => {
    const anime = await Anime.insert({
      name: req.body.name,
      character: req.body.character,
    });
    res.send(anime);
  })

  .get('/', async (req, res) => {
    const anime = await Anime.findByAll();
    res.send(anime);
  })

  .get('/id', async (req, res) => {
    const anime = await Anime.findById(req.params.id);
    res.send(anime);
  });
