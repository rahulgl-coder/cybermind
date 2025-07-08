const express=require('express')
const app=express()
require('dotenv').config()
const route=require('./Routes/addJob')

const cors = require('cors');

app.use(express.json())
app.use(cors({
  origin: 'https://cybermind-2-0m1r.onrender.com',  // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(route)





app.listen("5000",()=>{

    console.log("server started sucessfully");

    
})

