const { success } = require('zod');
const Order = require('../models/orders');
const { orderValidationSchema } = require('../utils/zodOrder-validation');
const statusCode = require('http-status-codes');

const createError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const createOrder = async (req, res) => {
  try {
    const validatedData = orderValidationSchema.safeParse(req.body);

    const newOrder = await Order.create(validatedData);

   return res.status(statusCode.OK).json({
      success: true,
      message: "Order successfully created",
       newOrder,
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res
        .status(statusCode.BAD_REQUEST)
        .json({ success: false, errors: err.errors });
    }

    res
      .status(err.status || statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const getdata = await Order.find();
    return res.status(statusCode.OK).json({
      success: true,
      message: "Order fetched successfully",
      getdata,
    });

  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  
  }
};
module.exports = { createOrder, getOrder };