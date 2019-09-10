const passport = require('passport');
const User = require('./../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv').config();


//AUTHENTICATES ENDPOINTS OF JWT
passport.use(new JwtStrategy({ 
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.TOKEN_SECRET
}, async (payload, done) => {
    try{
        //FIND THE USER SPECIFIED IN TOKEN
        const user = User.findById(payload.sub);
        if(!user){
            return done(null, false);
        }
        done(null, user);
    } catch(error){
        done(error, false)
    }
}));


passport.use(new LocalStrategy({
    usernameField:'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({"local.email":email});
        if(!user) {
            return done(null, false)
        }
        const isMatch = await user.isValidPassword(password);
        if(!isMatch) {
            return done(null, false)
        }
        done(null, user);
    } catch(error) {
        done(error, false)
    }
}));
