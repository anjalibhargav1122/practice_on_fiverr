const { z } = require("zod");

const reportValidation = z.object({
  user_id: z.string().min(24, "User ID is required"), 
  service_id: z.string().min(1, "Service ID is required"),
  reason: z
    .string()
    .trim()
    .min(5, "Reason must be at least 5 characters long")
    .max(200, "Reason cannot exceed 200 characters"),
  status: z.enum(["pending", "resolved"]).optional(),  
});

module.exports = { reportValidation };
