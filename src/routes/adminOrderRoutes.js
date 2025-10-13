const express = require("express");
const adminOrderRoutes = express.Router();
const adminOrderController = require("../controllers/adminOrderController");



adminOrderRoutes.get('/order/:order_id', adminOrderController.getAdminOrderById)
adminOrderRoutes.put('/order/:order_id', adminOrderController.updateAdminOrderById)




 


module.exports = adminOrderRoutes;