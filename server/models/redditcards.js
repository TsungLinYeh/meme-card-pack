const redditImageFetcher = require('reddit-image-fetcher');

let targetreddit = ['memes'];
// const targetreddit = ['ShitPostCrusaders'];

let storage = [];

const getPack = () => storage;

const getDeck = () => targetreddit;

const preload = (cb = () => {}) => {
  redditImageFetcher.fetch({
    type: 'custom',
    total: 10,
    addSubreddit: targetreddit,
  })
    .then((result) => {
      storage = result;
      cb();
    })
    .catch(console.log);
};

const change = (sub) => {
  targetreddit = [sub];
};

module.exports = {
  preload,
  getPack,
  change,
  getDeck,
};
