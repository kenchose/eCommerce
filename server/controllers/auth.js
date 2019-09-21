const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const passportAuth = '../config/passport.js';
const passport = require('passport');

const signToken = user => {
    return jwt.sign({
        iss:'issuer',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().getTime(new Date() + 10) 
    }, process.env.TOKEN_SECRET);
}

module.exports = {
    //REGISTER LOCALLY
    register: async (req, res) => { 
        const { email, password } = req.body;

        //CHECK IF USER ALREADY EXIST
        const emailExist = await User.findOne({"local.email":email});
        if(emailExist) return res.status(200).json({error:'Email already registered.'}); 

        // //CREATE USER
        const newUser = new User({
            method:'local',
            local:{
                email,
                password
            }
        })
        try {
            //SAVE USER AND ASSIGN TOKEN
            const user = await newUser.save();
            const token = signToken(user);
            const registeredUser = user._id
            res.status(200).send({token, registeredUser});
        } catch(error) {
            res.status(400).send(error)
        }
    },

    login:  (req, res, next) => {
        passport.authenticate('local', {session:false},  (err, user, info) => {
            if (err) return res.status(400).json(err)
            
            if (!user) {
                res.status(200).send({errors:info})
            } else {
                const token = signToken(user);
                user = user._id
                res.status(200).send({user, token})
            }
        })(req, res);
    },
    // login: async (req, res, next) => {
    //     const { email } = req.body;
    //     const user = req.user;
    //     const emailExist = await User.findOne({"local.email":email})
    //     if(!emailExist) return res.json({error:'Email isn\'t registered.'});
    //     //GENERATE AND SIGN TOKEN
        
    //     const token = signToken(req.user)
    //     res.status(200).json({user, token})
    // },

    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    logout: (req, res) => {
        req.logout();
        res.redredirect('/');
    }
}