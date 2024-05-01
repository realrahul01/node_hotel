const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()


const bodyParser = require('body-parser') // this is the middle ware to convert the data in json format
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('welcome to my hotel')
})




// import the router files
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const menuRoutes = require('./routes/menuRoutes')
app.use('/menu', menuRoutes)



const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log('serve is running on port 3000')
})