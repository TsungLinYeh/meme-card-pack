const router = require('express').Router();
const redditCards = require('../models/redditcards.js');

router.get('/open', (req, res) => {
  const pack = redditCards.getPack();
  res.status(200).send(pack);
  redditCards.preload();
});

module.exports = router;
