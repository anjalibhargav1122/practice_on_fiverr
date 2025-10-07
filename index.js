const express = require('express')
const router = require('./src/routes/orderRouter')
const dbConnection = require('./src/config/connection_db')
const { dbConnection } = require('./src/models/orders')


const app = express()



app.use(express.json())
dbConnection()

app.use('/api/orders', router)


app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
