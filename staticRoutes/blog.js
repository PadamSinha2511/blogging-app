const {Router} = require("express");
const { Blog } = require("../models/blog");

const router =Router();

router.get("/add-blog",(req,res)=>{
    return res.render("addblog",{
        user:req.user
    })
})

router.get("/:id",async(req,res)=>{
     const userBlog = await Blog.findById(req.params.id).populate("createdBy")

    return res.render("blog",{
        user:req.user,
        userBlog
    })
})



module.exports = router