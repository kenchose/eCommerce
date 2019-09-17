const passport = require('passport');
const User = require('./../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
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
            return done(null, "Email isn't registered.")
        }
        const isMatch = await user.isValidPassword(password);
        if(!isMatch) {
            return done(null, false, { error: 'Incorrect password.' });
            // return done(null, false)
            // return done(new Error('wrong password'), false)
        }
        done(null, user);
    } catch(error) {
        done(error, false)
    }
}));

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    // console.log('accessToken', accessToken)
    // console.log('refreshToken', refreshToken)
    // console.log('profile', profile)
    try{
        //check if currentUser exist
        const currentUser = await User.findOne({'google.id':profile.id});
        if(currentUser){
            console.log("User already exists", currentUser)
            return done(null, currentUser);
        }
        console.log('User doesn\'t exists we\'re making a new one')
        //but if new account user
        const user = new User({
            method:'google',
            google:{
                id:profile.id,
                email:profile.emails[0].value
            }
        });
        const newUser = await user.save();
        done(null, newUser)
    } catch(error) {
        done(error, false, error.message)
    }
}))