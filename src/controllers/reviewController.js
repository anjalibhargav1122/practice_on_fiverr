const Review = require("../models/reviewModel");
const statusCode = require('http-status-codes');
const CustomError = require("../utils/error_handler");
const zodUserValidation = require("../validators/zodReviewValidation")
exports.addReview = async (req, res) => {
  try {

    const validateData = zodUserValidation.safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }
    const { order_id, rating, comments, user_id, service_id } = validateData.data;

    const existingReview = await Review.findOne({ order_id, user_id, service_id });

    if (existingReview) {
      throw new CustomError("Review on this order is already exists", statusCode.BAD_REQUEST)
    }

    const createReview = await Review.create({
      order_id,
      user_id,
      service_id,
      rating,
      comments
    })

    return res.status(statusCode.CREATED).json({
      message: "Review created successfully",
      createReview
    });

  } catch (error) {

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }

}


exports.getserviceReview = async (req, res) => {
  try {
    const { service_id } = req.params
    const review = await Review.find({ service_id })

    return res.status(statusCode.OK).json({ message: "All Review Fetch Succesfully", review })
  } catch (error) {

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
}


exports.getuserReview = async (req, res) => {
  try {
    const { user_id } = req.params
    const review = await Review.find({ user_id })

    return res.status(statusCode.OK).json({ message: "All User Review Fetch Succesfully", review })
  } catch (error) {

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
}
exports.getorderReview = async (req, res) => {
  try {
    const { order_id } = req.params
    const review = await Review.find({ order_id })

    return res.status(statusCode.OK).json({ message: "Review Fetch Succesfully", review })
  } catch (error) {

    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });

  }
}


