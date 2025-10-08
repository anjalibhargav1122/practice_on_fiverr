const express = require('express')
const router = require('./src/routes/productRouter')
const dbConnection = require('./src/config/connection_db')
const errorMiddleware = require('./src/middlewares/custom-error-middlerware')

const app = express()

app.use(express.json())
dbConnection()

app.use('/fiverr/api',router)
app.use(errorMiddleware)
app.listen(3002,()=>{
    console.log('Server running on port 3002');
    
})
