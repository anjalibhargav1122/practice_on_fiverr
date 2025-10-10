const express = require("express");
const adminRouter = express.Router();
const adminController =  require("../controllers/adminController");



adminRouter.get("/users", adminController.getAllUser)

adminRouter.put("/user/:userId", adminController.updateUserRole)





module.exports = adminRouter;


