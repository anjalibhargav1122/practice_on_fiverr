const Product = require("../models/ProductModel");
const CustomError = require("../utils/error_handler");
const productValidation = require("../validators/zodProduct-validation");

exports.productService = async (req, res) => {
  try {
    const result = productValidation.safeParse(req.body);
    // console.log(result);

    if (!result.success) {
      // Zod error messages collect karo
      const messages = result.error.issues.map(err => err.message).join(", ");
      throw new CustomError(messages, 400);
    }

    const product = await Product.create(result.data); // validated data use karo
    // console.log(product);

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    // console.error(error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
