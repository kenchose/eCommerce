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
            lowercase:true
        },
        password:{
            type:String
        }
    },
    google:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    },
    facebook:{
        id:{
            type:String
        },
        email:{
            type:String,
            lowercase:true
        }
    }
}, {timestamps:true});

UserSchema.pre('save', async function(next) {
    try {
        if(this.method !== 'local'){
            next();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.local.password, salt);
        this.local.password = hashedPassword;
        next();
    } catch(error) {
        next(error);
    }
})

UserSchema.methods.isValidPassword = async function(newPassword) {
    try {
       return await bcrypt.compare(newPassword, this.local.password);
    } catch(error) {
        throw new Error(error)
    }
};


module.exports = mongoose.model('User', UserSchema);