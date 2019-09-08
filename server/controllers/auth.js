const User = require('./../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('./../models/validation');

const signToken = user => {
    return jwt.sign({
        iss:'issuer', //optional
        sub: user._id,
        iat: new Date().getTime(),//optional, this is current time
        exp: new Date().getTime(new Date() + 10) //expiration date current time plus 1 day
    }, process.env.TOKEN_SECRET);
}

module.exports = {
    //REGISTER LOCALLY
    register: async (req, res) => { 
        const { email, password } = req.body;

        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        //CHECK IF USER ALREADY EXIST
        const emailExist = await User.findOne({"local.email":email});
        if(emailExist) return res.status(400).send('Email is already registered.');

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //CREATE USER

        const user = new User({
            method:'local',
            local:{
                email:email,
                password:hashedPassword   //HASH PW IN PASSPORT FILE
            }
        })
        try {
            //SAVE USER AND ASSIGN TOKEN
            const newUser = await user.save();
            const token = signToken(user);
            res.status(200).json({newUser, token});
        } catch(error) {
            res.status(400).send(error)
        }
    },

    login: async (req, res) => {
        const { email } = req.body;
        const emailExist = await User.findOne({"local.email":email})
        if(!emailExist) return res.status(400).send('Email isn\'t registered.');

        //GENERATE AND SIGN TOKEN
        const token = signToken(req.user)
        res.status(200).json({token})
    }
}