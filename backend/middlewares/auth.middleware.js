import jwt from "jsonwebtoken"
import redisClient from "../services/redis.service.js";

export const authUser=async(req,res,next)=>{
   
   try {
     const token=req.cookies.token || req.headers.authorization.split(" ")[1];

     if(!token){
        return res.status(401).send({error:"plz authenticate"})
     }

     // if user has logged out then the token will be blacklisted, and if we 
     // found the token in the blacklist in redis then we will not 
     // authenticate the user
     const isBlacklisted=await redisClient.get(token)

     if(isBlacklisted){

        res.cookie("token","");
        return res.status(401).send({error:"plz authenticate"})
     }

     const decoded=jwt.verify(token, process.env.JWT_SECRET);

     req.user=decoded;
     next();

   } catch (error) {
    res.status(401).send({error:"plz authenticate"})
   }
}