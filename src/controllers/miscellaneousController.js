const Report = require("../models/reportModel");
const statusCode = require("http-status-codes");
const CustomError = require("../utils/error_handler");
const { reportValidation } = require("../validators/zodReportValidation");

exports.reportService = async (req, res, next) => {
  try {
    const result = reportValidation.safeParse(req.body)

    if (!result.success) {
      const message = result.error.errors.map(e => e.message).join(", ");
      throw new CustomError(message, statusCode.BAD_REQUEST);
    }

    const { user_id, service_id, reason, status } = result.data;

    const newReport = await Report.create({
      user_id,
      service_id,
      reason,
      status: status || "pending",
    });

  
    return res.status(statusCode.CREATED).json({
      message: "Service repoerted successfully",
       newReport
    });

  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
