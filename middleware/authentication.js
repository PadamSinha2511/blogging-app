const { validateToken } = require("../services/authentication")

function checkForCookie(cookieName)
{
   return (req,res,next)=>{
    const tokenCookieValue = req.cookies[cookieName]
    console.log(tokenCookieValue);
    if(!tokenCookieValue)return next();

    try {
        const payload = validateToken(tokenCookieValue)
        req.user = payload
        console.log(payload)
    } catch (error) {
        
    }


    return next()
   }
}


module.exports={checkForCookie}