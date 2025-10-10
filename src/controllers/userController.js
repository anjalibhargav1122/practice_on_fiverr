const z = require("zod");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/error_handler");
const statusCode = require('http-status-codes')

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
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }

    const existingUser = await User.findOne({ email: validateData.data.email });

    if (existingUser) {
      throw new CustomError("Email Alredy Exists", statusCode.BAD_REQUEST);
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
    return res.status(statusCode.OK).json({
      success: true,
      message: "User get successfuly",
      getAllUser,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
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

    return res.status(statusCode.OK).json({
      success: true,
      message: "User get successfuly",
      getOneUser,
    });
  } catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
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
      throw new CustomError("This User Doesn't Exists", statusCode.BAD_REQUEST);
    }
    const validateData = zodUserValidation.partial().safeParse(req.body);
    if (!validateData.success) {
      const message = validateData.error.issues
        .map((err) => `${err.path.join(".")} - ${err.message}`)
        .join(", ");
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }
    const updateData = validateData.data;

    // 🧠 Check if email is being updated
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });

      if (existingUser && existingUser._id.toString() !== id) {
        throw new CustomError("Email already exists", statusCode.BAD_REQUEST);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      throw new CustomError("User not found", statusCode.BAD_REQUEST);
    }

    return res.status(statusCode.OK).json({
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
    const id = req.params.id;

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      throw new CustomError("User not found", statusCode.BAD_REQUEST);
    }

    return res.status(statusCode.OK).json({
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
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }

    const { email, password } = validateData.data;

    // 🧠 Step 2: Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new CustomError("Invalid email or password", statusCode.BAD_REQUEST);
    }

    // 🧠 Step 3: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid email or password", statusCode.BAD_REQUEST);
    }

    // 🧠 Step 4: Send JWT Token in cookie
    sendToken(user, statusCode.OK, res, "Login successful");
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
    return res.status(statusCode.OK).json({
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

exports.passwordChange = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      throw new CustomError("All fields are required", statusCode.BAD_REQUEST);
    }
    if (newPassword !== confirmNewPassword) {
      throw new CustomError(
        "New Password and Confirm password Doesn't match",
        400
      );
    }
    const user = await User.findById(req.user._id).select("+password");

    const isMatched = await bcrypt.compare(oldPassword, user.password);
    if (!isMatched) {
      throw new CustomError("Old Password is incorrect", statusCode.BAD_REQUEST);
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    return res.status(statusCode.OK).json({
      success: true,
      message: "Password changed successfully",
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
// forget-password

exports.forgetPassword = async (req,res)=>{
  try {
    const {email} = req.body;

    if(!email){
      throw new CustomError("Email is Not valid",statusCode.BAD_REQUEST)

    }

    const user = await User.findOne({email})
     if(!user){
      throw new CustomError("This Email is Not Registered",statusCode.BAD_REQUEST)

    }



    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = Date.now()+10*60*1000
    await user.save({validateBeforeSave:false})

    return res.status(statusCode.OK).json({
      success:true,
      message:"Otp send successfully",
      otp
    })
    
  } catch (error) {
     const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  
  }
}

//reset password

exports.resetPassword = async (req,res)=>{
  try {
    const{email,otp,newPassword,confirmNewPassword} = req.body
    if(!email || !otp || !newPassword ||!confirmNewPassword){
      throw new CustomError("All fields are Required",statusCode.BAD_REQUEST)
    }
    if(newPassword !== confirmNewPassword){
      throw new CustomError("New password and ConfirmNewPassword Should Be same",statusCode.BAD_REQUEST)
    }

    const user = await User.findOne({
      email,
      otp,
      otpExpire:{ $gt: Date.now() }

    })

    if(!user){
      throw new CustomError("Invalid user/otp",statusCode.BAD_REQUEST)
    }

const hashedPassword = await bcrypt.hash(newPassword,10)
user.password = hashedPassword

 user.otp = undefined;
    user.otpExpire = undefined;

await user.save()



return res.status(statusCode.OK).json({
      success:true,
      message:"Password Reset Successfully",
      
    })  } catch (error) {
     const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  
  
  }
}