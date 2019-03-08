const express = require('express');

const passport = require('passport');
const passportServices = require('../services/passport');
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignIn = passport.authenticate('local', {session:false}
);

const Auth = require('../controller/authentication');

const router = express.Router();
const start = require('./start');

// 'requireAuth' (use passport-jwt) :  for protected route ( start, ....)
router.get('/', requireAuth, (req,res) => res.redirect('/start'));

router.post('/sign-up', Auth.signup);

// 'requireSignIn' (passport-local) : create token
// 'Auth.signin' : send token
router.post('/sign-in', requireSignIn, Auth.signin);  




// router.get('/sign-up', (req,res) => {
//     console.log("++++++ in api/Auth/sign-up, req.body:", req.body);
//     res.send('authenticaion/sign-up ----')
// });
// router.get('/sign-in', (req,res) => {
//     console.log("++++++ in api/Auth/sign-in, req.body:", req.body);
//     res.send('authenticaion/sign-in ----')
// });



module.exports = router;
