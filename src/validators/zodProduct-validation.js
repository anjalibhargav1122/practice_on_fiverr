
const { z } = require("zod");

const productValidation = z.object({
  title: z.string().min(3, "title kam se kam 3 characters ka hona chahiye"),
  description: z.string().min(10, "description kam se kam 10 characters ka hona chahiye"),
  price: z.coerce.number().positive("price positive number hona chahiye"),
  coverImageUrl: z.string().url("valid URL dena zaroori hai").optional(),
  category: z.string().optional(),
});

module.exports = productValidation 
