const mongoose = require('mongoose')
const { type } = require('../validators/zodUserValidation')
const { string } = require('zod')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['buyer','seller'],
        default:'buyer',
    },
    profileImageUrl:{
        type:String
    },
    bio:{
        type:String
    },
    mobileNo:{
        type:String
    },
    otp:{
        type:string
    },
    otpExpire:{
        type:Date
    }

},
{
    timestamps:true
}
)

module.exports = mongoose.model('User',userSchema)