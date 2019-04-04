const express = require('express');
const passport = require('passport');
const passportServices = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session:false});
const Auth = require('../controller/authentication');
const router = express.Router();
// const start = require('./start');

router.post('/sign-up', Auth.signup);
router.post('/sign-in', requireSignIn, Auth.signin);  

// 'requireSignIn' (passport-local) : verify user. If fails, stop process. Axios send (poor) error
//  If success, then 'Auth.signin' : create token and send token, userId and message.

module.exports = router;
