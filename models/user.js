const { createHmac,randomBytes } = require('node:crypto');
const {handleAuthentication} = require("../services/authentication")
const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    
    },
    password:{
        type:String,
        required:true,
    
    },
    profileImageUrl:{
        type:String,
        default:"./public/images/default.png"
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:"USER"
    }


},{timestamps:true})



userSchema.static('matchPassword',async function(email,password){
    const user = await this.findOne({email})
    if(!user) throw new Error('User not found in db');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPasswordHash = createHmac('sha256',salt).update(password).digest('hex')

    if(userProvidedPasswordHash !== hashedPassword) throw new Error('Incorrect Password')
    
    
    const token = handleAuthentication(user)



    return token
})


userSchema.pre('save',function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hashPassword=createHmac('sha256',salt)
                        .update(user.password)
                        .digest('hex')


    this.salt  = salt;
    this.password = hashPassword;
    next();

})



const User = mongoose.model("user",userSchema)

module.exports = {User}
