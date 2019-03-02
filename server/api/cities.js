// Handle all the middleware for particular part of backend(for here cities)
// handling http method (GET,...)  -- Router

const express = require('express');
const Cities = require('../models/cities');
const router = express.Router();

router.get('/', Cities.retrieveALL)
router.post('/', Cities.insert)

// router.get('/', (req,res) => {
//     Cities.retrieveALL((err, cities) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(cities)
//     })
// })
// router.post('/', (req,res) =>{
//     const city = req.body.city;
//      Cities.insert(city, (err, result) => {
//         if (err) {
//             return res.json(err);
//         }
//         return res.json(result)
//     })
// })

// to be useed in main server file - /server/index.js
module.exports = router;

