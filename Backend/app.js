const express=require('express')
const app=express()
require('dotenv').config()
const route=require('./Routes/addJob')

const cors = require('cors');

app.use(express.json())
app.use(cors());
app.use(route)

// app.use(cors({
//   origin: 'http://localhost:5173', 
//   methods: ['GET', 'POST'],        
//   credentials: true                
// }));





app.listen("5000",()=>{

    console.log("server started sucessfully");

    
})

