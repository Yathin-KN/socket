const express=require('express')
const http=require('http')
const {Server}=require("socket.io")
const cors=require('cors')
require('dotenv').config()

const app=express()

app.use(cors())

const port=process.env.PORT || 3001;

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        methods:["GET","POST"],
    }
})

io.on("connection",(socket)=>{
   console.log(`User connected: ${socket.id}`)

   socket.on("send_message",(data)=>{
        console.log(data)
        socket.broadcast.emit("receive_message",data);
   })
})


server.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`)
})
