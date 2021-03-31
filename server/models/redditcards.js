const redditImageFetcher = require('reddit-image-fetcher');

const targetreddit = ['memes'];
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

module.exports = {
  preload,
  getPack,
};
