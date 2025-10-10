const express = require('express');
const { createOrder, getOrder} = require('../controllers/ordersController');
const router = express.Router();


router.post('/addOrder',createOrder);
router.get('/getOrder', getOrder)


module.exports = router;
