const { Router } = require('express');

const router = new Router()

router.get('/outfit', (req, res, next) => {
    res.json({ outfit: "outfit"  })
});

module.exports = router;