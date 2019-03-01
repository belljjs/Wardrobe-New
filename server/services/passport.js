const passport = require('passport');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {verifyUser, findUserById} = require('../models/auth/signIn');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const localOptions = {usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, (email,password, done) => {
    console.log(" +++++ IN LocalStrategy ")
    console.log(" +++++ IN LocalStrategy email:", email);
    console.log(" +++++ IN LocalStrategy password:", password);
    console.log(" +++++ IN LocalStrategy done:", done);
     return verifyUser(email)
            .then(validUser => {
                console.log(" +++++++++ befor bcrypt, password:",password);
                console.log(" +++++++++ befor bcrypt, validUser:",validUser);
                console.log(" +++++++++ befor bcrypt, validUser.pw:",validUser.pw);
                bcrypt.compare(password, validUser.pw)
                .then(validPassword => {
                    if (validPassword) {
                        return done(null, validUser)
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(" error Inside :",err)
                    done(err. false)
                })
            })
            .catch(err => {
                console.log(" error Outside :",err)
                
                done(err. false)
            })
 })

 const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: "supersecret"
  };

 const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    return findUserById(payload.sub)
           .then(foundUser => {
                if (foundUser) {
                    return done(null, validUser)
                }
                return done(null, false);
            })
            .catch(err => done(err. false))
})

passport.use(jwtLogin);
passport.use(localLogin);




