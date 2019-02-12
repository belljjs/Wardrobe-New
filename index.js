const express = require('express');
const app = express();
const logger = require('morgan');

app.use((req, res, next) => {
    console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
    next();
  });
app.use(logger('dev'));


app.get('/test', (req, res, next) => {
    res.json([
      {id:1},
      {id:2}
    ])
});

const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});