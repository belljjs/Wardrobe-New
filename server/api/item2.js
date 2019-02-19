const { Router } = require('express');

const router = new Router()
// const Item = require('../models/item');


router.post('/', (req,res) => {
    const item = req.body.item;
    // Items.insert(item, (err, result) => {
    //     if (err) {
    //         return res.json(err);
    //     }
    //     return res.json(result)
    // })
    console.log("item:", item)
})
module.exports = router;