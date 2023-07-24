const {Router} = require("express");
const { Blog } = require("../models/blog");
const Comment = require("../models/comment");

const router =Router();

router.get("/add-blog",(req,res)=>{
    return res.render("addblog",{
        user:req.user
    })
})

router.get("/:id",async(req,res)=>{
     const userBlog = await Blog.findById(req.params.id).populate("createdBy")
     const comments = await Comment.find({blogId:req.params.id}).populate("createdBy");
    return res.render("blog",{
        user:req.user,
        userBlog,
        comments
    })
})



module.exports = router