// const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { createUser } = require('../models/auth/signUp');
const bcrypt = require('bcrypt');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    console.log(" *** In tokenForUser, timestamp:", timestamp);


    // need to hide password later !!   --- config ???
    return jwt.sign({sub: user.id, iat: timestamp, expiresIn: '60m' }, "supersecret")
}

const signin = (req,res,next) => {
    console.log( " In controller starting signin... ");
    console.log( " varified user : ", req.user );

    const {email, password} = req.body;
    res.send({
        token: tokenForUser(req.user), 
        userId: req.user.id, 
        message: "Successfully signed in"
    })
    
}

const signup = (req,res,next) => {
    const {firstName, lastName, email, password} = req.body;
    saltRounds = 12
    if(!email || !password || !firstName ) {
        res.send({message: 'Please provide a first_name, an email and a password' })
    }

    console.log("Before bcrypt.hash ....")

    bcrypt.hash(password,saltRounds)
    .then(hash => {
        console.log("Inside .then after bcrypt.hash, hash:", hash);

        return createUser(firstName, lastName, email, hash)
               .then(newUser => {
                    console.log("Inside .then after createUser....")
                        res.json({
                            token: tokenForUser(newUser), 
                            userId: newUser.id,
                            message:"Successfully signed up"
                        });
               })
               .catch(error => {
                 console.log("Sign up error in createUser : ", error.detail)
                res.send({message: error.detail});
                // return next(error);
        })
    })
    .catch(error => {
        console.log("Sign up error in bcrypt.hash : ", error)
        return next(error);
    })
}

module.exports = { signin, signup }

