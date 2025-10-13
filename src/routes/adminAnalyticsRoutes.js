const express = require("express");
const adminAnalyticsController = require('../controllers/adminAnalyticsController')
const adminAnalyticsRoutes = express.Router();




adminAnalyticsRoutes.get("/analytics",adminAnalyticsController.getAdminAnalytics)



module.exports = adminAnalyticsRoutes;