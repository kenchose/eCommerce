const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const passportAuth = "../config/passport.js";
const passport = require("passport");

const signToken = user => {
  return jwt.sign({
      // iss:'issuer',
      sub: user._id,
      iat: new Date().getTime(),
      exp: Math.floor(Date.now() / 1000) + 60 * 24 * 7 // 1 week | Math.floor(Date.now() / 1000) gets timestamp in secs
      //aud:"iPhone-App" | if the token has an aud field that has the value iPhone-App then ignore the exp claim, so that tokens with iPhone-App never expire since the user can reopen the app in a month and not have to sign in again.
    },
    process.env.TOKEN_SECRET
  );
};

module.exports = {
  //REGISTER LOCALLY
  register: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      address
    } = req.body;
    //CHECK IF USER ALREADY EXIST
    const emailExist = await User.findOne({
      "local.email": email
    });
    if (emailExist)
      return res.status(200).json({
        errors: "Email already registered."
      });

    //CREATE USER
    const newUser = new User({
      method: "local",
      local: {
        email,
        password
      },
      first_name,
      last_name,
      address
    });

    try {
      //SAVE USER AND ASSIGN TOKEN
      const user = await newUser.save();
      let token = signToken(user);

      //SEND USER, HEADER, AND TOKEN VALUE
      token = `Bearer ${token}`;
      res
        .status(200)
        .header("Authorization", token)
        .json({
          token,
          user
        });
    } catch (error) {
      res.status(400).json(error);
    }
  },

  login: (req, res, next) => {
    passport.authenticate(
      "local", {
        session: false
      },
      (err, user, info) => {
        if (err) return res.status(400).json(err);
        if (!user) {
          res.status(200).json({
            success: false,
            message: info
          });
        } else {
          let token = signToken(user);
          //SEND SIGNED TOKEN, USER, AND SET HEADER VALUE
          token = `Bearer ${token}`;
          res
            .status(200)
            .header("Authorization", token)
            .json({
              user,
              token
            });
        }
      }
    )(req, res);
  },

  googleOAuth: (req, res, next) => {
    passport.authenticate(
      "google", {
        session: false
      },
      (err, user, info) => {
        console.log('finally made it maybeeeeeee', user)
        if (err) return res.status(400).json(err);
        if (!user) {
          res.status(200).json({
            success: false,
            message: info
          });
        } else {
          let token = signToken(user);
          //SEND SIGNED TOKEN, USER, AND SET HEADER VALUE
          token = `Bearer ${token}`;
          res
            .status(200)
            .header("Authorization", token)
            .json({
              user,
              token
            });
        }
      }
    )(req, res);
  },

  facebookOAuth: (req, res, next) => {
    console.log("go tto controllers");
  },

  logout: (req, res, next) => {
    req.logout();
    res.redredirect("/cartify");
  }
};
