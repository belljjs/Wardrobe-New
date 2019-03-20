const express = require( 'express' );
const path = require( 'path' );
const Outfit = require('../models/outfit');
const passport = require('passport');
const passportServices = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session:false});
const router = express.Router();

router.post('/newOutfit',   Outfit.insert)
router.get('/outfits',  Outfit.retrieveAll)
router.get('/outfit',  Outfit.retrieveOne)
router.delete('/delete',  Outfit.delete)

module.exports = router;