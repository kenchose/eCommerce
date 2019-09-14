const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


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
            match:[emailRegex, "Must be a valid email."]
        },
        password:{
            type:String,
            min:[8, "Password must be at least 8 characters"],
            match:[passwordRegex, "Password must contain one number and special character"],
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