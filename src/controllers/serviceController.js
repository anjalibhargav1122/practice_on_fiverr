const CustomError = require("../utils/error_handler");
const statusCode = require("http-status-codes");



exports.getAllService = async (req,res) => {
    try {
        const services = await Service.find();
        if(!services){
        throw new CustomError("service not found",statusCode.NOT_FOUND)
      }
        return res.status(200).json(services);
    } catch (err) {
        return res.status(400).json({

            success:false,
            message:"err in catch of getallServices",
            err
          });
    }
}