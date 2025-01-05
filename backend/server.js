import "dotenv/config.js"
import app from "./app.js"
import http from "http"
import {Server} from "socket.io"

const port=process.env.PORT

const server=http.createServer(app);
const io=new Server(server)

io.on("connection",(socket)=>{
    console.log("a user connected")
    
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})

server.listen(port,()=>{
    console.log(`server listening on port ${port}`);
    
})