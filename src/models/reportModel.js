const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service ID is required"],
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
      minlength: [5, "Reason must be at least 5 characters long"],
      maxlength: [200, "Reason cannot exceed 200 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
