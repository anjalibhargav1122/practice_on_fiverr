const statusCode = require("http-status-codes");
const User = require("../models/Usermodel");
const CustomError = require("../utils/error_handler");



exports.getAllUser = async (req,res) => {
   try{
      const users = await User.findOne();
      if(!users){
        throw new CustomError("user not found",statusCode.NOT_FOUND)
      }
      return res.status(200).json(users);
   } catch (err) {
          return res.status(400).json({

            success:false,
            message:"err in catch of getallusers",
            err
          });

   }
}



exports.updateUserRole = async (req, res) => {
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


