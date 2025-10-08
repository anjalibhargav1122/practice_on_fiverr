const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    seller_id:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true},
    title:{type:String,required:true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    status:{Enum:["active","inactive","pending","deleted"]},
    
}
,
{
    timestamps:true
})
module.exports = mongoose.model('Product',serviceSchema)