const router = require('express').Router();
const redditCards = require('../models/redditcards.js');

router.get('/open', (req, res) => {
  const pack = redditCards.getPack();
  res.status(200).send(pack);
  redditCards.preload();
});

router.post('/change', (req, res) => {
  const sub = req.body.subreddit;
  redditCards.change(sub);
  res.sendStatus(201);
  redditCards.preload();
});

module.exports = router;
