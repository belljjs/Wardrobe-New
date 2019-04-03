const passport = require('passport');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {verifyUser, findUserById} = require('../models/auth/signIn');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../../database');

const localOptions = {usernameField: 'email'};

// console.log(" +++++ IN LocalStrategy ")
// console.log(" +++++ IN LocalStrategy email:", email);
// console.log(" +++++ IN LocalStrategy password:", password);
// console.log(" +++++ IN LocalStrategy done:", done);

const localLogin = new LocalStrategy(
        localOptions, 
        (email,password, done) => {
            return  db.oneOrNone(` SELECT * FROM users WHERE  email = $1`, [email])
            // return verifyUser(email)
                    .then(validUser => {
                        console.log("** ValidUser :",validUser );
                        if(validUser){
                            bcrypt.compare(password, validUser.pw)
                            .then(validPassword => {
                                if (validPassword) {
                                    console.log("====== email and password is correct====");
                                    console.log("validUser:",validUser);
                                    return done(null, validUser)
                                }
                                return done(null, false);
                            })
                            .catch(error => {
                                console.log(" error in password :", error)
                                done(error, false)
                            })
                        } else {
                            return done(null, false);
                        }
                    })
                    .catch(error => {
                        console.log(" error in email :", error)
                        done(error, false)
                    })
        }
)

 const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    // hide the password later!!
    secretOrKey: "supersecret"
  };

 const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
     console.log("jwtOptions:",jwtOptions);
     console.log("payload:",payload);
    return findUserById(payload.sub)
           .then(foundUser => {

                if (foundUser) {
                    console.log("User Found!")
                    return done(null, validUser)
                }
                console.log("User Not Found!")
                return done(null, false);
            })
            .catch(error => done(error. false))
})

passport.use(jwtLogin);
passport.use(localLogin);




