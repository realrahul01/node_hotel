const mongoose = require('mongoose')
require('dotenv').config()


// define the MongoDB connection url
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
const mongoURL = process.env.MONGODB_URL

// setup mongodb connection 
mongoose.connect(mongoURL)

const db = mongoose.connection

db.on('connected',()=>{
    console.log('connected to mongoDB server')
})
db.on('error',(err)=>{
    console.log('mongoDB connection error', err)
})
db.on('disconnected',()=>{
    console.log('mongoDB disconnected')
})

module.exports = db
