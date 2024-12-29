import mongoose, { mongo } from "mongoose";


// this function is used to connect to the database
function connect(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("database connected")
    })
    .catch((err)=>{
       console.log(`some error occurred while connecting database ${err}`)
    })
}

export default connect;