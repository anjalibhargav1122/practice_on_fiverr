const express = require("express")
 
const { createReview, getallReview } = require("../controllers/reviewController")



const reviewRouter = express.Router()

reviewRouter.post("/createReview",createReview )
 
reviewRouter.get("/getReview",getallReview )
 

module.exports = reviewRouter


