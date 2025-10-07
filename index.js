const express = require('express')
const dbConnection  = require('./src/config/connection_db')
const router  = require('./src/routes/userRoutes')
const errorMiddleware = require('./src/middlewares/errorMiddleware')
const app = express()

app.use(express.json())
dbConnection()
app.use('/fiverr/api',router)
app.use(errorMiddleware)

app.listen(3002,()=>{
    console.log('Server running on port 3002');
    
})


