const { z } = require('zod');

const userValidationSchema = z.object({
 
  
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),

    email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email format" })
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      { message: "Invalid email address pattern" }
    ),
    
    password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
    
  role: z
  .enum(["buyer", "seller"], {
    invalid_type_error: "Role must be either 'buyer' or 'seller'",
  })
  .default("buyer"),
  
  profileImageUrl: z
  .string()
  .url({ message: "Profile image must be a valid URL" })
  .optional(),
  
  bio: z
  .string()
  .max(200, { message: "Bio must not exceed 200 characters" })
  // .optional(),
  ,
  mobileNo: z
  .string()
  .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" })
  // .optional(),
});

module.exports = userValidationSchema;