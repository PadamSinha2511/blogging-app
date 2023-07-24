const {Blog}  = require("../models/blog")
const Comment = require("../models/comment")

async function handleUpload(req,res){
   const {title,body} = req.body
   
    const blog = await Blog.create({
        title,
        body,
        createdBy:req.user._id,
        coverImage:`/uploads/${req.file.filename}`
   })
    return res.redirect(`/blog/${blog._id}`)
}

async function handleComment(req,res)
{
    
   const comment= await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
    })

    
}

module.exports ={
    handleUpload,
    handleComment
}