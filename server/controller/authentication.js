// const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
// const config = require('../../config');
const { createUser } = require('../models/auth/signUp');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const tokenForUser = (user) => {
    
    const payload = {
        sub: user.id, 
        iat: new Date().getTime(), 
        exp: 3600 
    }
    return jwt.sign(payload, process.env.REACT_APP_SECRET_KEY);
}

const signin = (req,res,next) => {
    console.log( " In controller/ authentication, starting signin... ");
   
    const {email, password} = req.body;
    const token = tokenForUser(req.user);

    console.log( " token:",token );
    console.log( " req.user.id:",req.user.id );

    res.send({
        token: token,
        userId: req.user.id, 
        message: "Successfully signed in",
        exp: 3600
    })
    
}

const signup = async(req,res,next) => {
    console.log("In controller/auth start sign up:");

    const {firstName, lastName, email, password} = req.body;
    saltRounds = 12
    try{
        const hash = await bcrypt.hash(password,saltRounds);
        console.log("hash:",hash);

        const newUser = await createUser(firstName, lastName, email, hash)
        console.log("newUser:",newUser);
        console.log("Successfully user created")

        const token = tokenForUser(newUser)
        res.send({
            token: token, 
            userId: newUser.id,
            message:"Successfully signed up",
            exp: 3600
        });

    }
    catch(error) {
        console.log("Sign up error ", error.detail, " ---------")
        res.status(400).send(error.detail);
    }
}

module.exports = { signin, signup }

