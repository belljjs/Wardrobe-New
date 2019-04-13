
require('dotenv').config()
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const request = require('request');
const session = require('express-session');

const passport = require('passport');
const passportServices = require('./services/passport');
require('./services/passport');

const app = express();
const cors = require('cors');


app.use(logger('dev'));
app.use(require('cookie-parser')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
// app.use('/public', express.static( __dirname + '/public') );

app.use(cors());

app.use('/api/authentication', require('./api/authentication'));
app.use('/api/cities',         require('./api/cities'));
app.use('/api/weather',        require('./api/weather'));
app.use('/api/item',           require('./api/item'));
app.use('/api/outfit',         require('./api/outfit'));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
//In rarer cases, your app may be using process.env.PORT, but may still be failing to bind. 
//This can be caused by the app attempting to bind on localhost. Instead, you may need to change this to 0.0.0.0.
const DOMAIN = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const PORT = process.env.PORT || 4646;

app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});

module.exports = app;
