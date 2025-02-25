const mongoose = require('mongoose')

const busSchema = new mongoose.Schema({
    name : String,
    routeNumber : String,
    registerNumber : String,
    route : Array,
    timing : Array
})

const busModel = mongoose.model('bus',busSchema)

module.exports = busModel