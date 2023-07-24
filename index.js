const express = require('express')
const path = require('path')
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const app = express();
const PORT = 8000;

mongoose.connect('mongodb://127.0.0.1:27017/blogging')
.then(()=>console.log("Connected to db"))
.catch((err)=>console.log("Db error in connecting" ,err))


const {Blog} = require("./models/blog")


const staticUserRoutes = require("./staticRoutes/user")
const staticBlogRoutes = require("./staticRoutes/blog")
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog")
const cookieParser = require('cookie-parser');
const { checkForCookie } = require('./middleware/authentication');



app.set('view engine','ejs')
app.set('views',path.resolve("./views"))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkForCookie("token"))
app.use(express.static(path.resolve("./public")))



app.get("/",async (req,res)=>{
   
    const allBlogs = await Blog.find({});

    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})
app.use("/user",staticUserRoutes)
app.use("/blog",staticBlogRoutes)
app.use("/api/user",userRoutes)
app.use("/api/blog",blogRoutes)

app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))