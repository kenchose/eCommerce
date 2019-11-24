const User = require("./../models/User");
const jwt = require("jsonwebtoken");
const passportAuth = "../config/passport.js";
const passport = require("passport");

const signToken = user => {
  return jwt.sign({
      // iss:'issuer',
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().getTime(new Date() + 10),
      //aud:"iPhone-App" | if the token has an aud field that has the value iPhone-App then ignore the exp claim, so that tokens with iPhone-App never expire.
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
        error: "Email already registered."
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

  googleOAuth: async (req, res, next) => {
    try {
      const user = req.user
      let token = signToken(user);
      token = `Bearer ${token}`;
      // res.status(200).header("Authorization", token).json({
      console.log('token', token)
      res.status(200).header("Authorization", token).redirect('/cartify/home').json({
        user,
        token
      })
    } catch (err) {
      res.status(400).json({
        messageError: err
      })
    }
  },

  logout: (req, res, next) => {
    req.logout();
    res.redredirect("/cartify");
  }
};
