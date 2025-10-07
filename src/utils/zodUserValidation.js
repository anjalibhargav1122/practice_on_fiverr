const { z } = require('zod');

const userValidationSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username too long"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(['buyer', 'seller']).optional(),
  profileImageUrl: z.string().optional(),
  description: z.string().max(200, "Description too long").optional(),
});

module.exports = userValidationSchema;
