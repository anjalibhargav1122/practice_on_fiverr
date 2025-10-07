const CustomError = require("../utils/error_handler");

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  
 // 🧩 Handle Zod validation errors
  if (err.name === "ZodError") {
    statusCode = 400;

    // Zod errors have `issues`, not `errors`
    const errorMessages = err.errors || err.issues;

    if (Array.isArray(errorMessages)) {
      message = errorMessages.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    } else {
      message = "Invalid input data";
    }
  }
  // 🧩 Handle Mongo duplicate key errors
  if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;
