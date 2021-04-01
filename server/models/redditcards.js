const redditImageFetcher = require('reddit-image-fetcher');

let targetreddit = ['memes', 'gifs'];
// const targetreddit = ['ShitPostCrusaders'];

let storage = [];

const getPack = () => storage;

const preload = () => {
  redditImageFetcher.fetch({
    type: 'custom',
    total: 10,
    addSubreddit: targetreddit,
  })
    .then((result) => {
      storage = result;
    });
};

const change = (sub) => {
  targetreddit = [sub];
};

module.exports = {
  preload,
  getPack,
  change,
};
