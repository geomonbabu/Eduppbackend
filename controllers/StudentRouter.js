const express = require("express")
const router = express.Router()
const multer = require("multer"); 
const studmodel = require("../models/StudentModel")
const bcrypt = require("bcryptjs")
const path = require("path")

HashGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File name will be timestamp + original name
    }
});

const upload = multer({ storage: storage });
router.post("/register", upload.single('profileimage'),async(req,res)=>{
    //let data = req.body //read values
    let{data} = {"data":req.body}
    if(data.name=="" || data.emailid=="" || data.password=="" || data.profileimage==""){
        return res.json({
        status:"empty"
     })
    }  else{
                let email = req.body.emailid
                let input = await studmodel.findOne({"emailid": email})
                if(input){
                    return res.json({
                        status:"emailexist"
                    })
                }
                else{
                const hashedPassword=await HashGenerator(password)
                data.password=hashedPassword
                const profileimage = req.file.path; 
                data.profileimage = profileimage
                let blog = new studmodel(data)
                let result = blog.save()
                res.json({
                status:"success"
                })
                }}        
                console.log(data) 
    })
router.post("/signin",async(req,res)=>{
    let data=req.body
    let email = req.body.emailid
    let input = await studmodel.findOne({"emailid": email})
    if(!input){
        return res.json({
            status:"invalid email"
        })
    }
    else {
        console.log(input)
        let dbPass=input.password
        let orgPass=req.body.password
        console.log(dbPass)
        console.log(orgPass)
        const match = await bcrypt.compare(orgPass,dbPass)
        if(!match)
        {
            return res.json({
                status:"incorrect password"
            })
        }
        else {
            res.json({
                status:"success","userdata":input
            })
        }
        
    }
    console.log(email)
    //console.log(pass)
})
router.post("/viewprofile",async(req,res)=>{
    let data = req.body
    let output = await studmodel.find(data)
    res.json(
        output
)
})
router.post("/updateprofile",async(req,res)=>{
    let data = req.body
    console.log(data)
    let output =await studmodel.updateMany(data)
    res.json({
        status:"success"
})
})
router.post("/resetpassword",async(req,res)=>{
    let{data} = {"data":req.body}
    let password = data.password
    const hashedPassword=await HashGenerator(password)
    data.password=hashedPassword
    let output = await studmodel.updateOne(data)
                 res.json({
                 status:"success"
                }
                )
})
module.exports=router
