const mongoose = require("mongoose")
const revieworder = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true, unique: true
  },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comments: { type: String }
})
module.exports = mongoose.model('Review', revieworder);