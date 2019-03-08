const jwt = require('jwt-simple');
const config = require('../../config');
const { createUser } = require('../models/auth/signUp');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    console.log(" *** In tokenForUser, timestamp:", timestamp);
    // need to hide password later !!
    return jwt.encode({sub: user.id, iat: timestamp}, "supersecret")
}

const signin = (req,res,next) => {
    console.log("+++ in controller/signin, req.body:", req.body);
    console.log("+++ in controller/signin, req.user:", req.user);

    res.send({token: tokenForUser(req.user), userId: req.user.id })
}

const signup = (req,res,next) => {
    console.log("+++ in controller/signup, req.body:", req.body);
    const {firstName, lastName, email, password} = req.body;
    saltRounds = 12

    if(!email || !password) {
        res.status(422).send({error: 'Please provide an email and a password' })
    }
    bcrypt.hash(password,saltRounds)
    .then(hash => {
        return createUser(firstName, lastName, email, hash)
               .then(newUser => {
                   res.json({token: tokenForUser(newUser), userId: newUser.id});
               })
               .catch(err => {
                console.log("Sign up error:", err)
                res.json({err: 'Error in creation of new user'});
            })
    })
    .catch(err => {
        return next(err);
    })
}

module.exports = { signin, signup }

