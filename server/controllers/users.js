const User = require('./../models/User');


module.exports = {
    okie: async (req, res) => {
        console.log('id controller', req.body._id)
        console.log('email controller', req.body.email)
        // const currUser = await User.findOne
        // console.log("asffafs")
        // res.json({secret:'this is a secret'})
    },

    google: async (req, res) => {
        
    },

    deleteUser:  (req, res, next) => {
        let id = req.params.id;
        User.deleteOne({_id:id}, (err, user) => {
            if(err){
                res.status(400).json({error:"No user", err});
            } else{
                res.status(200).json({success:"User deleted", user});
            }
        })
    },

    one:(req, res, next) => {
        res.json({one: 'this is a secret for page 1'})
    },
    two:(req, res, next) => {
        res.json({two: 'this is a secret for page 2'})
    },
    three:(req, res, next) => {
        res.json({three: 'this is a secret for page 3'})
    },
}
