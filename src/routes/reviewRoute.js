const express = require("express")
 
const { createReview, getallReview ,getselllerReview,getbuyerReview} = require("../controllers/reviewController")



const reviewRouter = express.Router()

reviewRouter.post("/createReview",createReview )
 
reviewRouter.get("/getReview",getallReview )

reviewRouter.get("/getbuyerReview",getbuyerReview)
reviewRouter.get("/getselllerReview",getselllerReview)
 

module.exports = reviewRouter


