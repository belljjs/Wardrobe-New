//main index.js
// require('rootpath')();
require('dotenv').config()
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
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

// const prepare = require('../_helpers/prepare');
// const errorHandler = require('../_helpers/error_handler');

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


// app.get('/', (req,res) => res.redirect('/api/start'));

app.use('/api/authentication', require('./api/authentication'));
app.use('/api/cities',         require('./api/cities'));
app.use('/api/weather',        require('./api/weather'));
app.use('/api/item',           require('./api/item'));
app.use('/api/outfit',         require('./api/outfit'));

// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const DOMAIN = 'localhost';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});

module.exports = app;
