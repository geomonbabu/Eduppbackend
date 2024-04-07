const mongoose = require("mongoose")

const studSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        emailid:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        profileimage:{
            type:String,
            required:true
        }   
    }
)
module.exports = mongoose.model("student",studSchema)