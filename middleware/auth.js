const jwt = require("jsonwebtoken")
const auth = (req,res,next)=>{
    const {token} = req.cookies
    try {
        if(!token){
            res.send(403).send("token is missing")
        }
        const decode = jwt.verify(token,"mysecretkey")
        console.log(decode)
        req.user = decode
    } catch (error) {
        res.send(403).status("Invalid token")
    }

    next()
}

module.exports = auth