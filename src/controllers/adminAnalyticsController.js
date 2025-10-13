const User = require('../models/Usermodel');
const Service = require('../models/ProductModel');
const CustomError = require("../utils/error_handler");
const statusCode = require("http-status-codes");



exports.getAdminAnalytics = async (req,res) => {
    try {
        const orders = await Order.find()
        if (!orders) {
            throw new CustomError("orders not found", statusCode.NOT_FOUND);  
        }
        const totalRevenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        const activeUsers = await User.countDocuments({isActive: true});

        const services = await Service.find().limit(5);

        return res.status(statusCode.OK).json({
            success: true,
            message:"Admin analytics fetched successfully",
            analytics: {
                totalRevenue,
                activeUsers,
                topServices: services,
            },
        });
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: err.message || "Error in getAdminAnalytics"
        })
    }
}