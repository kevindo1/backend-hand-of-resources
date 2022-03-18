const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  // const anime = await Anime.insert({
  //   name: req.body.name,
  //   character: req.body.character,
  // });
  const anime = { name: 'Jujutsu Kaisen', character: 'Nobara Kugisaki' };
  res.send(anime);
});
