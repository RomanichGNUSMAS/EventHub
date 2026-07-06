const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : { type : String, required: true},
    email : { type : String, required: true },
    password : { type : String, required: true},
    role : { type : String, enum : ["Organizer","Member"], default : "Member"}
})

exports.userModel = mongoose.model("User",userSchema)
