const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const redditcardsRoutes = require('./routes/redditcards.js');
const redditCards = require('./models/redditcards.js');

const logger = (req, res, next) => {
  console.log(`Receiving request to ${req.url} with method ${req.method}`);
  next();
};

app.use('/', logger);
app.use('/redditcards', redditcardsRoutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

const port = 3000;
const server = app.listen(port, () => {
  // redditCards.preload();
  console.log(`listening on http://localhost:${port}`);
});

module.exports = {
  app,
  server,
};
