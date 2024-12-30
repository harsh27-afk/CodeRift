
import express from "express"
import morgan from "morgan"
import connect from "./db/db.js"
import userRoutes from "./routes/user.route.js"


const app=express();
connect();

//
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users",userRoutes)

app.get("/",(req,res)=>{
    res.send("hello world")
    console.log(process.env.MONGODB_URI)
})

export default app;