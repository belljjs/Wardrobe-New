// Handle all the middleware for particular part of backend(for here cities)
// handling http method (GET,...)  -- Router

const express = require('express');
const Cities = require('../models/cities');
const router = express.Router();

router.get('/', Cities.retrieveALL)
router.post('/', Cities.insert)

module.exports = router;

