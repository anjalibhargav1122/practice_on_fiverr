const Order = require('../models/orders');
const statusCode = require('http-status-codes')
const { th } = require('zod/locales');

const orderUptade = async (req, res) => {
    try {
        const { status } = req.body;

        const validateStatus = ["pending", "in_progress", "completed", "cancelled"]

        if (!validateStatus.includes(status)) {
            throw new CustomError("Invalid Status", statusCode.BAD_REQUEST)
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) {
            throw new CustomError("Order not found", statusCode.NOT_FOUND)

        }

        return res.status(statusCode.OK).json({
            success: true,
            message: "Order status updated successfully",
            order
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message,
        });
    }
}

const orderDelete = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            throw new CustomError("Order not found", statusCode.NOT_FOUND)
        }

        res.status(statusCode.OK).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = { orderUptade, orderDelete }