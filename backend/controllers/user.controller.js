import userModel from "../models/user.model.js"
import * as userService from "../services/user.service.js"
import { validationResult } from "express-validator"

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
        res.status(201).json({user,token})
    }
    catch(e){
        res.status(400).json({message:e.message})
    }

}


