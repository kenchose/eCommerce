const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const passportAuth = '../config/passport.js';
const passport = require('passport');

const signToken = user => {
  return jwt.sign({
    // iss:'issuer',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().getTime(new Date() + 10)
  }, process.env.TOKEN_SECRET);
}

module.exports = {
  //REGISTER LOCALLY
  register: async (req, res) => {
    const {
      email,
      password
    } = req.body;

    //CHECK IF USER ALREADY EXIST
    const emailExist = await User.findOne({
      "local.email": email
    });
    if (emailExist) return res.status(200).json({
      error: 'Email already registered.'
    });

    // //CREATE USER
    const newUser = new User({
      method: 'local',
      local: {
        email,
        password
      }
    })
    try {
      //SAVE USER AND ASSIGN TOKEN
      const user = await newUser.save();
      const token = signToken(user);

      //SEND USER, HEADER, AND TOKEN VALUE
      res.status(200).header('Authorization', token).json({
        user,
        token
      });
    } catch (error) {
      res.status(400).json(error)
    }
  },

  login: (req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, user, info) => {
      if (err) return res.status(400).json(err)
      if (!user) {
        res.status(200).json({
          success: false,
          message: info
        })
      } else {
        const token = signToken(user);

        //SEND SIGNED TOKEN, USER, AND SET HEADER VALUE
        res.status(200).header('Authorization', token).json({
          user,
          token
        });
      }
    })(req, res);
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      token
    });
  },

  logout: (req, res) => {
    req.logout();
    res.redredirect('/cartify');
  }
}
