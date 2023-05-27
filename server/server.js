const express = require('express')
const connection = require('./database/db')
const router = require("express").Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const route = require('./routes/route')
require('dotenv').config()




const app = express();
const port = process.env.PORT || 8000;

connection(process.env.DB_URL || 'mongodb+srv://myuser:myuser@blogweb.x9x7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true}))   //for avoiding ramdong type of url Ex %%%//create

app.listen(port, ()=>{
    console.log("server started at ", port)
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/', route)

app.use((req, res, next)=>{
    // console.log("home: ", req.body)
    res.status(404).json({
        error: 'bad request'
    })
})

// console.log("Done")