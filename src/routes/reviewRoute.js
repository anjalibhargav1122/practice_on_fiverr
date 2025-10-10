const express = require("express")
const { addReview, getserviceReview, getuserReview, getorderReview } = require("../controllers/reviewController")
 

const reviewRouter = express.Router()

reviewRouter.post("/addReview",addReview)
 
 
reviewRouter.get("/serviceReview",getserviceReview )

reviewRouter.get("/getuserReview",getuserReview)
reviewRouter.get("/getorderReview",getorderReview)
 

module.exports = reviewRouter


