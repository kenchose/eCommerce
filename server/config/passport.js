const passport = require("passport");
const User = require("./../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
// const GooglePlusTokenStrategy = require('passport-google-plus-token');
const GoogleOAuthStrategy = require("passport-google-oauth20"); //netNinja
const dotenv = require("dotenv").config();

// JWT STRATEGY
passport.use(
  new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("authorization"),
      secretOrKey: process.env.TOKEN_SECRET
    },
    async (payload, done) => {
      try {
        //FIND THE USER SPECIFIED IN TOKEN
        const user = await User.findById(payload.sub); //payload represents the signToken function
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
      // passReqToCallBack: true
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          "local.email": email
        });
        if (!user) {
          return done(null, false, {
            message: "Email isn't registered."
          });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
          return done(null, false, {
            message: "Invalid email/password"
          });
        }
        return done(null, user);
      } catch (error) {
        done(null, error);
      }
    }
  )
);

// // GOOGLE OAUTH20
passport.use('google',
  new GoogleOAuthStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    //   try {
    //     console.log('accessToken', accessToken)
    //     //check if currentUser exist
    //     const currentUser = await User.findOne({
    //       "google.id": profile.id
    //     });
    //     if (currentUser) {
    //       console.log("User already exists", currentUser);
    //       return done(null, currentUser);
    //     }
    //     console.log("User doesn't exists we're making a new one");
    //     //but if new account user then
    //     const user = new User({
    //       method: "google",
    //       google: {
    //         id: profile.id,
    //         email: profile.emails[0].value,
    //         first_name: profile.name.givenName,
    //         last_name: profile.name.familyName
    //       }
    //     });
    //     const newUser = await user.save();
    //     done(null, newUser);
    //   } catch (error) {
    //     done(error, false, error.message);
    // }
  })
);
