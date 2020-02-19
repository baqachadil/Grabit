require('dotenv').config()
const express = require('express')
const app = express()
const AuthRouter = require('./Routes/Authentication')
var cors = require('cors');


var mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true })
var db = mongoose.connection

db.on('error', (error) => console.log(error))
db.on('open', () => console.log("Connected to database ..."))


app.use(cors())
app.use(express.json())
app.use('/users', AuthRouter)



app.listen(5000, () => console.log('Server listening on 5000 ...'))