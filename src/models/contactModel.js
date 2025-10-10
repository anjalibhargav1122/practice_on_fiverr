const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true},
        message:{type:String,required:true},
        status:{Enum:["active","inactive","pending","deleted"]},
},{
    timestamps:true
})
module.exports = mongoose.model('contact',contactSchema)