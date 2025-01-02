import userModel from "../models/user.model.js"
import * as userService from "../services/user.service.js"
import { validationResult } from "express-validator"
import redisClient from "../services/redis.service.js"

export const createUserController=async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        // calling the actual service to create a user
        const user = await userService.createUser(req.body)

        // generate JWT token to make user logged in after registration
        const token = await user.generateJWT()

        // delete the password from the user object so that it is not sent back to the frontend
        delete user._doc.password
        res.status(201).json({user})
    }
    catch(e){
        res.status(400).json({message:e.message})
    }

}

export const loginUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // calling the actual service to login a user
        const user = await userService.loginUser(req.body); // Pass the entire req.body here

        // generate JWT token to make user logged in after registration
        const token = await user.generateJWT();
        
        delete user._doc.password;
        res.status(200).json({ user, token });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const profileController=async(req,res)=>{
    console.log(req.user);

    res.status(200).json({user:req.user})
}

export const logoutController=async(req,res)=>{
    try{
        // get the token from the header
        const token=req.cookies.token || req.header("Authorization").replace("Bearer ","")
        // add the token to the blacklist
        await redisClient.set(token,"logout", "EX", 60*60*24)
        res.status(200).json({message:"logged out"})
    }
    catch(e){
        res.status(400).json({message:e.message})
    }
}



