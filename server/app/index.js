const express = require('express');
const app = express();
const logger = require('morgan');
const itemRouter = require('./api/item')
const outfitRouter = require('./api/outfit')

const Item = require('./item')


app.use((req, res, next) => {
    console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
    next();
});
app.use(logger('dev'));

app.use('/item', itemRouter);
app.use('/outfit', outfitRouter);


module.exports = app;