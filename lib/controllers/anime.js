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
    // const anime = await Anime.findAll();
    const anime = [
      {
        id: '1',
        name: 'Jujutsu Kaisen',
        character: 'Nobara Kugisaki',
      },
      {
        id: '2',
        name: 'Demon Slayer',
        character: 'Tanjiro Kamado',
      },
    ];
    res.send(anime);
  });
