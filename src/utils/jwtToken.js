const jwt = require("jsonwebtoken") ;

 const sendToken = (user, statusCode, res, message = "Success") => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
   
  });

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE_DAYS * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};
module.exports = sendToken