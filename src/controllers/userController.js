const CustomError = require('../utils/error_handler')


const User = require('../models/Usermodel')
const zodUserValidation = require('../validators/zodUserValidation')

exports.registerUser = async (req,res,next)=>{

    try{
        
        const validateData = zodUserValidation.parse(req.body)

        const existingUser = await User.findOne({email:validateData.email})
        if(existingUser){
            return next( new CustomError("Email Alredy Exists",400))
        }

        const user = await User.create(validateData);

        res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            user
        })

    }
    catch(error){
        next(error)
        // throw new CustomError(`Error in Catch Block of Register user:${error.message}`,400)
    }

}