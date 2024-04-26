const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"student"
        },
        comment:{
            type:String,
            required:true
        },
        timestamp: {
            type: Date,
            default: Date.now
          }
    }
)
module.exports = mongoose.model("comment",commentSchema)