const express = require('express');
const { createOrder, getOrder} = require('../controllers/ordersController');
const { orderUptade, orderDelete } = require('../controllers/orderUptade');
const orderRouter = express.Router();


router.post('/addOrder',createOrder);
router.get('/getOrder', getOrder);
router.put('/updateOrder/:id',orderUptade );
router.delete('/deleteOrder/:id',orderDelete );


module.exports = orderRouter;
