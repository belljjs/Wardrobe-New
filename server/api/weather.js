const express = require('express');
const Weather = require('../models/weather');
const router = express.Router();

router.get('/:city', (req, res) => {
  const city = req.params.city;

  Weather.retrieveByCity(city, (error, weather) => {
    if (error) 
      return res.json(error);
    return res.json(weather);
  });
});

module.exports = router;