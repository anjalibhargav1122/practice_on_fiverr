const Order = require('../models/orders');
const { orderValidationSchema } = require('../utils/zodOrder-validation');


const createError = (message, status = 400) => {
  const error = new Error(message);
  error.status = status;
  return error;
};


const createOrder = async (req, res) => {
  try {
    const validatedData = orderValidationSchema.parse(req.body);

    const newOrder = await Order.create(validatedData);

    res.status(201).json({
      success: true,
      message: "Order successfully created",
      order: newOrder
    });
  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    res.status(err.status || 500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder };
