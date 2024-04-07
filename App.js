const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const studrouter = require("./controllers/StudentRouter")


//aliasname
const app=express()


//middleware
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://polu:fisat1234@atlascluster.7tns0g6.mongodb.net/eduppdb?retryWrites=true&w=majority&appName=AtlasCluster",{
    useNewUrlParser:true
})

//routing or api
app.use("/api/eduapp",studrouter)
app.use('/uploads', express.static('uploads'));


app.listen(3001,()=>{
    console.log("server is running")
})