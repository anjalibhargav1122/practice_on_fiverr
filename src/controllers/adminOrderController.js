// const { findById } = require("../models/Usermodel");
const { success } = require("zod");
const CustomError = require("../utils/error_handler");
const statusCode = require("http-status-codes");



exports.getAdminOrderById = async (req,res) => {
    try {
        const { order_id } = req.params;

    if (!order_id) {
        throw new CustomError("order id is required",statusCode.BAD_REQUEST);
    }

    const order = await Order.findById(order_id);
    if (!order) {
        throw new CustomError("order not found",statusCode.NOT_FOUND);   
    }

    return res.status(statusCode.OK).json({
        success: true,
        data: order
    });

    } catch (err) {
        return res.status(statusCode.BAD_REQUEST).json({
            success:false,
            message:err.message || "Error in getAdminOrderById"
          });
    }
}




exports.updateAdminOrder = async (req,res) => {
    try {
        const { order_id } = req.params;
        const { status, adminNotes } = req.body;

    if (!order_id) {
        throw new CustomError("order id is required",statusCode.BAD_REQUEST);  
    } 
        const order = await Order.findById(order_id);
    if (!order) {
        throw new CustomError("order not found",statusCode.NOT_FOUND);
    }     
    
    if (status) order.status = status;
    if (adminNotes) order.adminNotes = adminNotes;

    await order.save();

    return res.status(statusCode.OK).json({
        success: true,
        data: order
    });

    } catch (err) {
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message:err.message || "Error in updateAdminOrder"
        })
    }
}