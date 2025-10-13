const express = require('express');
const { createOrder, getOrder, getOrdersByUser, getOrdersByService } = require('../controllers/ordersController');
const { orderUptade, orderDelete } = require('../controllers/orderUptade');
const orderRouter = express.Router();


orderRouter.post('/addOrder',createOrder);
orderRouter.get('/getOrder', getOrder);
orderRouter.get('/user/:user_id', getOrdersByUser);
orderRouter.get('/service/:service_id', getOrdersByService);


orderRouter.put('/updateOrder/:id',orderUptade );
orderRouter.delete('/deleteOrder/:id',orderDelete );


module.exports = orderRouter;
