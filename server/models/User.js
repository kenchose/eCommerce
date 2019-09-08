const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    method:{
        type:String,
        enum:['local', 'google', 'facebook'],
        required:true
    },
    local:{
        email:{
            type:String,
            lowercase:true,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        },
    },
    facebook:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        },
    }
}, {timestamps:true});

UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
       return await bcrypt.compare(newPassword, this.local.password);
    } catch(error) {
        throw new Error(error)
    }
};


module.exports = mongoose.model('User', UserSchema);