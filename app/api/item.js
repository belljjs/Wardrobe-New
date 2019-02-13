const { Router } = require('express');

const router = new Router()
const Item = require('../item')

router.get('/new', (req, res, next) => {
    newItem = new Item({color: "white", season: "summer"});
    console.log('newItem',newItem)

    res.json({item: newItem  })
});

module.exports = router;