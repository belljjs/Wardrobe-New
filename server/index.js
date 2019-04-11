//main index.js
// require('rootpath')();
require('dotenv').config()
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
//const flash = require('connect-flash');
const request = require('request');
const session = require('express-session');
//const expressSession = require('express-session');

const passport = require('passport');
const passportServices = require('./services/passport');
require('./services/passport');


const PORT = process.env.PORT || 4646;
const app = express();
const cors = require('cors');



//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(require('cookie-parser')());
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
// app.use('/public', express.static( __dirname + '/public') );

app.use(cors());


if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("build"));

  // Express will serve up the front-end index.html file if it doesn't recognize the route
  app.get("*", (req, res) =>
    res.sendFile(path.resolve("build", "index.html"))
  );
}



app.use('/api/authentication', require('./api/authentication'));
app.use('/api/cities',         require('./api/cities'));
app.use('/api/weather',        require('./api/weather'));
app.use('/api/item',           require('./api/item'));
app.use('/api/outfit',         require('./api/outfit'));


const DOMAIN = 'localhost';
const PORT = process.env.PORT || 4646;

app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});

module.exports = app;
