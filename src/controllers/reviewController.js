const Review = require("../models/reviewModel");
const statusCode = require('http-status-codes');
const CustomError = require("../utils/error_handler");
const zodUserValidation = require("../validators/zodReviewValidation")
exports.createReview = async (req, res) => {
  try {

    const validateData = zodUserValidation.safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }
    const { order, rating, comments } = validateData.data;
    const buyer = req.body.buyer;
    const existingReview = await Review.findOne({ order: order, buyer: buyer });

    if (existingReview) {
      throw new CustomError("Review on this order is already exists", statusCode.BAD_REQUEST)
    }

    const createReview = await Review.create({
      order,
      buyer,
      rating,
      comments
    })

    return res.status(statusCode.CREATED).json({
      message: "Review created successfully",
      createReview
    });

  } catch (error) {

    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }

}


exports.getallReview = async (req, res) => {
  try {

    const findallReview = await Review.find()

    return res.status(statusCode.OK).json({ message: "All Review Fetch Succesfully", findallReview })
  } catch (error) {

    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
}


