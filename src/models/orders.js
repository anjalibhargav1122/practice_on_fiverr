const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', },
  payment_status: {enum:["paid","unpaid"] },
  price: { type: Number, },
  quantity: { type: Number, },
  orderdate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);