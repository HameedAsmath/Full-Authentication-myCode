const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    images:{
        type: Array,
        default: null
    },
    date:{
        type: String,
    },
    venue:{
        type: String,
        unique: true
    },
},{timestamps: true})
module.exports = mongoose.model("event",eventSchema)