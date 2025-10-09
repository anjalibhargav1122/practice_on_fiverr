const CustomError = require("../utils/error_handler");

const User = require("../models/Usermodel");
const zodUserValidation = require("../validators/zodUserValidation");

exports.registerUser = async (req, res) => {
  try {
    const validateData = zodUserValidation.safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, 400);
    }

    const existingUser = await User.findOne({ email: req.body.email });


    if (existingUser) {
      throw new CustomError("Email Alredy Exists", 400);
    }
   

    const user = await User.create(validateData.data);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;  
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
