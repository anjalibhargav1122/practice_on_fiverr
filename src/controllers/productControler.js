const Product = require("../models/ProductModel") 
const productValidation = require("../utils/zodProduct-validation") 



exports.productService = async(req,res,next)=>{
  try {
    const zodvalidation = productValidation.parse(req.body)
    const product = await Product.create(zodvalidation)
    res.status(201).json(
        {
            success:true,
            message:'product added succssfully',
            product
        }
    )
  } catch (error) {
next(error)    
  }  
}
