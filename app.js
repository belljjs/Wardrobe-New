const express = require('express');
const app = express();
const logger = require('morgan');

app.use((req, res, next) => {
    console.log(`📝 ${req.method} – ${req.path} – ${new Date().toString()}`);
    next();
  });
app.use(logger('dev'));


app.get('/', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

const DOMAIN = 'localhost';
const PORT = '4646';
app.listen(PORT, DOMAIN, () => {
  console.log(`🖥 Server listenning on http://${DOMAIN}:${PORT}`);
});