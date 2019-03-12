

var express = require('express');
var Weather = require('../models/weather');

var router = express.Router();

router.get('/:city', (req, res) => {
  var city = req.params.city;

  Weather.retrieveByCity(city, (error, weather) => {
    if (error) 
      return res.json(error);
    return res.json(weather);
  });
});

module.exports = router;