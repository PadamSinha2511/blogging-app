const {Router} = require("express")
const {handleSignIn,handleSignUp, handleLogout} = require("../controllers/user")
const router = Router();


router.post("/signin",handleSignIn)
router.post("/signup",handleSignUp)
router.get("/logout",handleLogout)
module.exports  = router;