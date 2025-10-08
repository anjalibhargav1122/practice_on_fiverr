const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./src/config/connection_db");
const reviewRouter = require("./src/routes/orders");
const CustomError = require("./src/utils/error_handler");


 

dotenv.config()
const app = express();

// DB connection
connectdb()

app.use(express.json());
 
app.use("/api/auth",reviewRouter);
 

app.use( CustomError);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
