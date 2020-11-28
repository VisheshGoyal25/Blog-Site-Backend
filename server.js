const express=require("express")
const mongoose=require("mongoose")
const crud=require('./routes/crud.js')
const user=require('./routes/user.js')
const app=express()
const url="mongodb://localhost/crud"
mongoose.connect(url,{useNewUrlParser:true ,useUnifiedTopology: true})
const con= mongoose.connection
con.on('open',()=>{
    console.log("Connected to database")
})
app.use(express.json())
app.use('/crud',crud)
app.use(express.json())
app.use('/user',user)
app.listen(5000,()=>{
    console.log("listening to server...")
})