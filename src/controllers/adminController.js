const statusCode = require("http-status-codes");
const User = require("../models/Usermodel");
const CustomError = require("../utils/error_handler");



exports.getAdminUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      throw new CustomError("Email is required", statusCode.BAD_REQUEST);
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new CustomError("User not found with this email", statusCode.NOT_FOUND);
    }

    return res.status(statusCode.OK).json({
      success: true,
      data: user,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "err in catch of getUserByEmail",
      err
    })
  }
};



exports.updateAdminUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;


    if (!role || !["buyer", "seller"].includes(role)) {
      return res.status(400).json(new CustomError("Role is required and must be 'buyer' or 'seller'", 400));
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json(new CustomError("User not found", 404));
    }

    const { password, ...updatedUser } = user.toObject();
    return res.status(200).json({ success: true, user: updatedUser });

  } catch (err) {
    return res.status(err.status || 500).json(new CustomError(err.message || "Internal Server Error", err.status || 500));
  }
};


