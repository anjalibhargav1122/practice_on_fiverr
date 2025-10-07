const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    // coverImageUrl: { type: String },
    category: { type: String },
    status:{Enum:["active","inactive","pending","deleted"]},
    
}
,
{
    timestamps:true
})
module.exports = mongoose.model('Product',serviceSchema)