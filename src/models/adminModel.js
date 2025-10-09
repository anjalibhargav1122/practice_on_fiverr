const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,              
      required: true,
      unique: true,              
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",                         
      required: true,
    },
    permissions: {
      type: [String],             
      default: [],                
    },
  },
  { timestamps: true }             
);


const Admin = mongoose.model("Admin", adminSchema);


module.exports = Admin;
