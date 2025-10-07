const { z } = require('zod');


const orderValidationSchema = z.object({
  buyer: z.string().min(24, "Buyer ID valid ObjectId hona chahiye"),
  seller: z.string().min(24, "Seller ID valid ObjectId hona chahiye"),
  product: z.string().min(24, "Product ID valid ObjectId hona chahiye"),
  quantity: z.number().min(1, "Quantity kam se kam 1 honi chahiye"),
  price: z.number().min(0, "Price positive number hona chahiye"),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']).optional()
});

module.exports = { orderValidationSchema };
