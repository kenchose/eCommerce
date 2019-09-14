const User = require('./../models/User');
const jwt = require('jsonwebtoken');

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
        const { email, password } = req.value.body;
        //CHECK IF USER ALREADY EXIST
        const emailExist = await User.findOne({"local.email":email});
        if(emailExist) return res.status(400).json({error:'Email is already registered.'});
        
        // //CREATE USER
        const user = new User({
            method:'local',
            local:{
                email:email,
                password:password  
            }
        })
        try {
            //SAVE USER AND ASSIGN TOKEN
            const newUser = await user.save();
            const token = signToken(newUser);
            res.status(200).json({newUser, token});
        } catch(error) {
            res.status(400).send(error)
        }
    },

    login: async (req, res) => {
        console.log('controllers ====>', req.body)
        const { email } = req.body;
        const emailExist = await User.findOne({"local.email":email})
        if(!emailExist) return res.status(400).send('Email isn\'t registered.');

        //GENERATE AND SIGN TOKEN
        const token = signToken(req.user)
        res.status(200).json({token})
    },

    googleOAuth: async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({token});
    },
}