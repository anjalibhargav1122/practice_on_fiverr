const express = require("express");
const adminServiceRoutes = express.Router();
const adminServiceController = require("../controllers/adminServiceController")


adminServiceRoutes.get("/services",adminServiceController.getAdminAllService)
adminServiceRoutes.put("/service/:service_id", adminServiceController.updateAdminServiceByTitle)



module.exports = adminServiceRoutes;