const mongoose = require("mongoose")

const dbConnection =()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/fiverr')
        .then(()=>{
            console.log("DataBase Connected successfully");
            
        })
        .catch(()=>{
            console.log(" Error in DataBase Connection");

        })
    }
    catch(err){
        console.log(`Error in Catch Block DataBase Connection ${err}`);

    }
}

module.exports=dbConnection