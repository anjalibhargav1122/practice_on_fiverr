const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./src/config/connection_db");
const errorHandler = require("./src/utils/error_handler");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
