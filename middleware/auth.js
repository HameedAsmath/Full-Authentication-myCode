const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const {token} = req.cookies
    try {
        if(!token){
            res.status(403).send("token is missing")
        }
        const decode = jwt.verify(token,"mysecretkey")
        req.user = decode
    } catch (error) {
        res.status(403).send("Invalid token")
    }

    return next()
}

module.exports = auth