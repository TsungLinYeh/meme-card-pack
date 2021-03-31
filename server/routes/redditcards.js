const router = require('express').Router();
const redditImageFetcher = require('reddit-image-fetcher');

const targetreddit = ['memes'];
// const targetreddit = ['ShitPostCrusaders'];

router.get('/open', (req, res) => {
  redditImageFetcher.fetch({
    type: 'custom',
    total: 10,
    addSubreddit: targetreddit,
  })
    .then((result) => {
      res.status(200).send(result);
    });
});

module.exports = router;
