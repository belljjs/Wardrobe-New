const jwt = require('jwt-simple');
const config = require('../../config');
const { createUser } = require('../models/auth/signUp');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    console.log(" *** In tokenForUser, timestamp:", timestamp);
    // need to hide password later !!   --- config ???
    return jwt.encode({sub: user.id, iat: timestamp}, "supersecret")
}

const signin = (req,res,next) => {
    console.log( " In controller starting signin... ");
    console.log( " varified user : ", req.user );

    const {email, password} = req.body;
    res.send({token: tokenForUser(req.user), userId: req.user.id, message:"Successfully logged in" })
    
}

const signup = (req,res,next) => {
    const {firstName, lastName, email, password} = req.body;
    saltRounds = 12
    if(!email || !password || !firstName ) {
        res.json({error: 'Please provide a name, an email and a password' })
    }

    console.log("Inside controller/signup ....")

    bcrypt.hash(password,saltRounds)
    .then(hash => {
        console.log("Inside .then after bcrypt.hash....")

        return createUser(firstName, lastName, email, hash)
               .then(newUser => {
                console.log("Inside .then after createUser....")
                   res.json({token: tokenForUser(newUser), userId: newUser.id});
               })
               .catch(error => {
                 console.log("Sign up error in createUser : ", error)
                res.send({error: 'Error during sign up'});
            })
    })
    .catch(error => {
        return next(error);
    })
}

module.exports = { signin, signup }

