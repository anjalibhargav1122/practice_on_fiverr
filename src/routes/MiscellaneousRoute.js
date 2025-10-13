const express = require("express")
const { reportService } = require("../controllers/miscellaneousController")
 
 

const reportRouter = express.Router()


 reportRouter.post("/reportService",reportService)

module.exports = reportRouter


