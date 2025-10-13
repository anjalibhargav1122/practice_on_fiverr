const express = require('express')
const orderRouter = require('./src/routes/orderRouter')
// const { dbConnection } = require('./src/models/orders')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const userrouter = require('./src/routes/userRoutes')
const reviewRouter = require('./src/routes/reviewRoute')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(express.json())


app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
app.use(cookieParser());

dbConnection()
app.use('/api/orders', orderRouter )
app.use("/api/auth",reviewRouter);
app.use('/fiverr/api',router)
app.use('/fiverr/api',userrouter)


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT} `);
    
})


