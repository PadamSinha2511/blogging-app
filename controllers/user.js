const {User} = require("../models/user")

async function handleSignIn(req,res)
{
    const {email,password} = req.body;
   try {
    const token = await User.matchPassword(email,password);

    
    return res.cookie("token",token).redirect("/")
   } catch (error) {
    return res.render("signin")
   }
}

async function handleSignUp(req,res)
{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password
    })

    return res.redirect("/")
}

function handleLogout(req,res)
{
    return res.clearCookie("token").redirect("/")
}

module.exports = {handleSignIn,handleSignUp,handleLogout}
