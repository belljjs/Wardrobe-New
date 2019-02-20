//main index.js

const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
var db = require('./database');
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4646;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
  next();
});
app.use(logger('dev'));

// router

// register middleware handling http request for cities
app.use('/api/cities',               require('./api/cities'));
app.use('/api/weather',              require('./api/weather'));
app.use('/api/item',                 require('./api/item'));
//      👆 path(end point for http request)    👆 module handling the request


const DOMAIN = 'localhost';
// const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});

module.exports = app;
