const express = require("express")
const router = express.Router()
const CommentModel = require("../models/CommentModel")
const studmodel = require("../models/StudentModel")

router.post("/addcomment", async (req, res) => {
    let { data } = { "data": req.body }
    let input = await studmodel.findOne({ "_id": data.userId })
    if (input) {
        let comment = new CommentModel(data)
        let result = comment.save()
        res.json({
            status: "success"
        })
    }
})
router.get("/viewcomment", async (req, res) => {
    let comment = await CommentModel.find().populate('userId')
    if (comment) {
        // Assuming 'userId' refers to a user model reference
        return res.json({
          "comment": comment // Send comment details
        });
      } else {
        return res.status(404).json({ message: "Comment not found" });
      }
})
module.exports=router