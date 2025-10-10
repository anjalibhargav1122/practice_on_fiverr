const jwt = require ("jsonwebtoken");
const CustomError = require ("../utils/error_handler.js");
const User = require ("../models/Usermodel.js");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new CustomError("Please login to access this resource", 401);
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized or token expired",
    });
  }
};
module.exports = isAuthenticatedUser
