const express = require('express')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const userrouter = require('./src/routes/userRoutes')
const reviewRouter = require('./src/routes/reviewRoute')

const app = express()

app.use(express.json())
dbConnection()
app.use("/api/auth",reviewRouter);
app.use('/fiverr/api',router)
app.use('/fiverr/api',userrouter)


app.listen(3002,()=>{
    console.log('Server running on port 3002');
    
})


