const  z  = require("zod") ;
const sendToken  = require("../utils/jwtToken");
const bcrypt = require('bcrypt') ;
const CustomError = require("../utils/error_handler");

const User = require("../models/Usermodel");
const zodUserValidation = require("../validators/zodUserValidation");
const { success } = require("zod");

// register user
exports.registerUser = async (req, res) => {
  try {
    const validateData = zodUserValidation.safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, 400);
    }

    const existingUser = await User.findOne({ email: validateData.data.email });

    if (existingUser) {
      throw new CustomError("Email Alredy Exists", 400);
    }

     const hashedPassword = await bcrypt.hash(validateData.data.password, 10);

    // 🧩 Step 4: Create user with hashed password
    const user = await User.create({
      ...validateData.data,
      password: hashedPassword,
    });


    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // ✅ fallback
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

//get user
exports.getAllUser = async (req, res) => {
  try {
    const getAllUser = await User.find();
    return res.status(201).json({
      success: true,
      message: "User get successfuly",
      getAllUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in Catch Block Of getAllUser",
      error,
    });
  }
};
//get user by id
exports.getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const getOneUser = await User.findById(id);
    console.log(getOneUser);
    if (!getOneUser) {
      throw new CustomError("User Not Found", 400);
    }

    return res.status(201).json({
      success: true,
      message: "User get successfuly",
      getOneUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in Catch Block Of getOneUser",
      error,
    });
  }
};
//update user

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError("This User Doesn't Exists", 400);
    }
    const validateData = zodUserValidation.partial().safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, 400);
    }
    const updateData = validateData.data;

    // 🧠 Check if email is being updated
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });

      if (existingUser && existingUser._id.toString() !== id) {
        throw new CustomError("Email already exists", 400);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new CustomError("User not found", 404);
    }

    return res.status(201).json({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // ✅ fallback
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
//delete user

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new CustomError("This User Doesn't Exists", 400);
    }

    const deleteUser = await User.findOneAndDelete(id);

    if (!deleteUser) {
      throw new CustomError("User not found", 404);
    }

    return res.status(201).json({
      success: true,
      message: "User Deleted Successfully",
      deleteUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500; // ✅ fallback
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
//login


// 🧩 Define login validation schema (using Zod)
const zodLoginValidation = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

exports.loginUser = async (req, res) => {
  try {
    // 🧠 Step 1: Validate input
    const validateData = zodLoginValidation.safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, 400);
    }

    const { email, password } = validateData.data;

    // 🧠 Step 2: Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new CustomError("Invalid email or password", 401);
    }

    // 🧠 Step 3: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid email or password", 401);
    }

    // 🧠 Step 4: Send JWT Token in cookie
    sendToken(user, 200, res, "Login successful");

  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
//logout

exports.logoutUser = async (req, res) => {
  try {
    // 🧠 Step 1: Clear the JWT cookie
    res.cookie("token", "", {
      expires: new Date(Date.now()), // immediately expire
      httpOnly: true, // prevent client-side JS access
      secure: process.env.NODE_ENV === "production", // true only in production
      sameSite: "strict",
    });

    // 🧠 Step 2: Send response
    return res.status(200).json({
      success: true,
      message: "User logged out successfully 🚪",
    });

  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// password change

exports.passwordChange = async (req,res)=>
{
  try {
    const {oldPassword, newPassword, confirmNewPassword} = req.body
    if(!oldPassword || !newPassword || !confirmNewPassword){
      throw new CustomError("All fields are required",400)
    }
    if(newPassword !== confirmNewPassword){
      throw new CustomError("New Password and Confirm password Doesn't match",400)
    }
    const user = await User.findById(req.user._id).select("+password")

    const isMatched = await bcrypt.compare(oldPassword, user.password)
    if(!isMatched){
            throw new CustomError("Old Password is incorrect",400)

    }

    user.password = await bcrypt.hash(newPassword,10)

    await user.save()

    return res.status(200).json({
      success:true,
      message:"Password changed successfully",
      user
    })



  } catch (error) {
     const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
  }
