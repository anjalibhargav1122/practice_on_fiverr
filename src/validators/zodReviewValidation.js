const { z } = require("zod");

const createReviewSchema = z.object({
  order: z.string().length(24, "Invalid Order ID"),   
  buyer: z.string().length(24, "Invalid Buyer ID"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating can be at most 5"),
  comments: z.string().optional()   
});

module.exports = createReviewSchema ;
