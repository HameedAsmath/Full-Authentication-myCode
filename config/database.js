const mongoose = require("mongoose")
const {MONGO_URL} = process.env

exports.connect = ()=>{
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("DB connected successfully"))
    .catch((error)=>{
        console.log(error)
        console.log("DB connection failed")
        process.exit(1)
    })
}