const jwt = require('jsonwebtoken')

const secret = "jsndfknldsfkdsnfkjdfnjsndfklnflksdf";

function handleAuthentication(user)
{
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileImageUrl,
        role:user.role
    }

    const token = jwt.sign(payload,secret)
    return token
}

function validateToken(token)
{
    
    const payload = jwt.verify(token,secret)

    return payload
}

module.exports = {
    handleAuthentication,
    validateToken
}