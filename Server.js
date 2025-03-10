// Imports
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectToDb = require('./Config/dbConfig.js')
const cookieParser = require('cookie-parser')


// Creating App
const app = express()

// Middlewares
dotenv.config()
app.use(bodyParser.json())
app.use(cors({credentials : true}))
app.use(cookieParser())

// DB Connection
ConnectToDb()

// Listening App
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening the server at port ${port}...`)
})

// Connecting routes
require('./Routes/user.routes.js')(app)
require('./Routes/bus.routes.js')(app)


