

const express = require('express')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const reviewRouter = require('./src/routes/orders')

// const router  = require('./src/routes/userRoutes')
const app = express()

app.use(express.json())
dbConnection()
app.use("/api/auth",reviewRouter);
app.use('/fiverr/api',router)


app.listen(3002,()=>{
    console.log('Server running on port 3002');
    
})


