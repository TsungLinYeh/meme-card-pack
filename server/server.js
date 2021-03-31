const express = require('express');
const path = require('path');
// const redditImageFetcher = require('reddit-image-fetcher');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

const logger = (req, res, next) => {
  console.log(`Receiving request to ${req.url} with method ${req.method}`);
  next();
};

app.use('/', logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.on('listening', () => {
  // nodeyourmeme.search('ugandan knuckles').then(console.log).catch(console.error);
  // nodeyourmeme.random().then(console.log).catch(console.error);
});

const port = 3000;
const server = app.listen(port, () => {
  // redditImageFetcher.fetch({
  //   type: 'costum',
  //   total: 10,
  //   addSubreddit: ['memes', 'funny'],
  //   removeSubreddit: [],
  // })
  //   .then(console.log);
  console.log(`listening on http://localhost:${port}`);
});

module.exports = {
  app,
  server,
};
