const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/nba', require('./controllers/nba'));
app.use('/api/v1/food', require('/controllers/food'));
// app.use('/api/v1/anime', require('controllers/anime'));
// app.use('/api/v1/drinks', require('/controllers/drinks'));
// app.use('/api/v1/games', require('/controllers/games'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
