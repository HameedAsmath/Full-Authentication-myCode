+require("dotenv").config()
require("./config/database").connect()
const express = require('express')
const bcrypt = require("bcrypt")
const app = express()
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//importing model
const User = require("./model/user")

//Home route
app.get("/",(req,res)=>{
    res.send("Hello World")
})

//Register route
app.post("/register", async(req,res)=>{
    try {
        const {firstname, lastname, email, password, token} = req.body
        if(!(firstname && lastname && email && password)){
            return res.status(401).send("All fields are required")
        }

        //checking if the user already exist
        const exstUser = await User.findOne({email})
        if(exstUser){
            return res.status(401).send("User already exist")
        }

        //hash password
        const encryptedpassword =await bcrypt.hash(password,10)

        //Create new entry
        const user =await User.create({
            firstname,
            lastname,
            email,
            password: encryptedpassword
        })

        //generate a token and send it to user
        const tocken = jwt.sign({
            id: user._id, email
        }, 'mysecretkey', {expiresIn: '2h'})

        user.token = tocken

        //dont want to send this to the user
        user.password = undefined
        console.log(user)
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
        console.log("Something went wrong")
    }
})

//login route
app.post("/login", async(req,res)=>{
    try {
        const {email, password} = req.body
        if(!(email && password)){
          return res.status(401).send("All fields are required")
        }
    
        const user = await User.findOne({email})
        if(!user){
            res.status(401).send("No user exist")
        }
        if(user && await(bcrypt.compare(password,user.password))){
        //create a token and send
        const token = jwt.sign({
            id: user._id, email
        }, 'mysecretkey',{expiresIn:'2h'})
    
        user.token = token
        user.password = undefined
    
        const option = {
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly: true
        }
        res.status(201).cookie("token",token,option).json({
            success: true,
            token,
            user
        })
        }
    
        else{
            res.status(400).send("email or password is incorrect")
        }
    } catch (error) {
        console.log(error)
    }   
})

//dashboard route
app.get("/dashboard",auth,(req,res)=>{
    res.send("dashboard")
})

module.exports = app