const {Router} = require("express")
const multer = require("multer")
const path = require("path");
const { handleUpload,handleComment } = require("../controllers/blog");
const router =Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
     const fileName = `${Date.now()} - ${file.originalname}`
     cb(null,fileName)
    }
  })
  
  const upload = multer({ storage: storage })




router.post("/",upload.single('coverImage'),handleUpload)
router.post("/comment/:blogId",handleComment)

module.exports = router