const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true},
    email : {
        type : String,
        required : true,
        unique : [true, "Mail Already Registered"]
    },
    password : {
        type : String,
        required : true,
        minlength : 8
    },
    phone : String,
    bookings : Array,
    role : {
        type : String,
        default : 'user'
    }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel