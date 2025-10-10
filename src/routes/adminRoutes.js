const express = require("express");
const adminRouter = express.Router();
const adminController =  require("../controllers/adminController");



adminRouter.get("/users/:email", adminController.getAdminUserByEmail)

adminRouter.put("/user/:userId", adminController.updateAdminUserRole)





module.exports = adminRouter;


