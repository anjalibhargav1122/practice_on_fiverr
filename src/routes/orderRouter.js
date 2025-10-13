const express = require('express');
const { createOrder, getOrder} = require('../controllers/ordersController');
const { orderUptade, orderDelete } = require('../controllers/orderUptade');
const orderRouter = express.Router();


orderRouter.post('/addOrder',createOrder);
orderRouter.get('/getOrder', getOrder);
orderRouter.put('/updateOrder/:id',orderUptade );
orderRouter.delete('/deleteOrder/:id',orderDelete );


module.exports = orderRouter;
