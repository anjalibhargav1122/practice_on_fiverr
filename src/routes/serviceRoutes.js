const express = require("express");
const serviceRouter = express.Router();
const serviceController = require("../controllers/serviceController")



serviceRouter.get("/services",serviceController.getAllService)



module.exports = serviceRouter;