

const express = require('express')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const reviewRouter = require('./src/routes/orders')
const userrouter = require('./src/routes/userRoutes')
const CustomError = require('./src/utils/error_handler')

// const router  = require('./src/routes/userRoutes')
const app = express()

app.use(express.json())

dbConnection()
app.use("/api/auth",reviewRouter);
app.use('/fiverr/api',router)
app.use('/fiverr/api',userrouter)

app.post("/check",(req,res,next)=>{
    if(!req.body.name){
        throw new CustomError("name is required",400)
    } else if(!req.body.age){
        throw new CustomError("age is required",400)
    } else if(!req.body.city){
        throw new CustomError("city is required",400)
    }
    next()
},(req,res)=>{
    try{
        const {name,age,city} = req.body;
        return res.json({name,age,city})
    }catch(err){
        console.log(err)
    }
})

app.use((err,req,res,next)=>{
    if(err instanceof CustomError){
        return res.json({
            status:false,
            message:err.message,
            code:err.statusCode
        })
    }

    console.log(err,"error middleware")

    return res.json({
        status:false,
        message:"Internal server error",
        code:500
    })


    // next();
})

app.listen(3002,()=>{
    console.log('Server running on port 3002');
    
})


