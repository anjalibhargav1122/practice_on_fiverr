

const express = require('express')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const reviewRouter = require('./src/routes/orders')
const userrouter = require('./src/routes/userRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser());

dbConnection()
app.use("/api/auth",reviewRouter);
app.use('/fiverr/api',router)
app.use('/fiverr/api',userrouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT} `);
    
})


