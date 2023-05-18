require("dotenv").config()
require("./config/database").connect()
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/EventsRoutes");
const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/',userRoutes)
app.use("/",eventRoutes)

module.exports = app