const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Order",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true 
  },
  service_id: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true },

  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String }
})

reviewSchema.index({ order_id: 1, user_id:1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);