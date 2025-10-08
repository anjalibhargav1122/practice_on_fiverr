const Review = require("../models/orderReview");
const statusCode = require('http-status-codes');
const CustomError = require("../utils/error_handler");
exports.createReview = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;
    const buyerId = req.user._id;

    const existingReview = await Review.findOne({ order: orderId });
    if (!existingReview) {
      throw new CustomError("Review on this order is already exists",statusCode.BAD_REQUEST)
    }

    const createReview = await Review.create({
      order: orderId,
      buyer: buyerId,
      rating,
      comment
    })
    return res.status(statusCode.CREATED).json({
      message: "Review created successfully",
      createReview
    });

  } catch (error) {

    throw new(CustomError("Server Error",statusCode.INTERNAL_SERVER_ERROR))
  }

}


exports.getallReview = async (req, res) => {
  try {

    const findallReview = await Review.find()

    res.status(statusCode.OK).json({ message: "All Review Fetch Succesfully", findallReview })
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Server Error", error })
  }
}
