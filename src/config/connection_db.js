 
const mongoose = require("mongoose")

const connectdb = () => {

  mongoose.connect("mongodb://localhost:27017/Fiverr")
    .then(() => {
      console.log("DB is connecting succesfully")
    })
    .catch((err) => {
      console.log("Error in connecting DB", err)
    })
}

module.exports = connectdb