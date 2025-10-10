const CustomError = require("../utils/error_handler");
const statusCode = require("http-status-codes");
const adminService = require("../models/ProductModel");
const { success } = require("zod");



exports.getAdminAllService = async (req,res) => {
    try {
        const services = await adminService.find();
        if(!services){
        throw new CustomError("service not found",statusCode.NOT_FOUND)
      }
        return res.status(statusCode.OK).json({
          success: true,
          data: services
        });
    } catch (err) {
        return res.status(statusCode.BAD_REQUEST).json({
            success:false,
            message:err.message || " Error in getAdminAllService"
          });
    }
}




exports.updateAdminServiceByTitle = async (req, res) => {
  try {
    const { service_id } = req.params;
    const { title } = req.body; 

    if (!title) {
      throw new CustomError("Title is required", statusCode.BAD_REQUEST);
    }

    const service = await adminService.findById(service_id);
    if (!service) {
      throw new CustomError("Service not found", statusCode.NOT_FOUND);
    }

    service.title = title;
    await service.save();

    return res.status(statusCode.OK).json({
      success: true,
      message: `Service title updated to "${service.title}"`,
      data: service,
    });

  } catch (err) {
    return res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: err.message || "Error in updateServiceByTitle",
    });
  }
};
