import {Router} from 'express'
import * as userController from "../controllers/user.controller.js"
// if theres a lot of named import from a file use above * method instead of manually listing all functions in { }

import { body } from 'express-validator';



// here we are creating an instance of Router class, so that we can use all the functions declared in the Router class
const router=Router();

router.post("/register",
    body('email').isEmail().withMessage("email must be a valid email address"),
    body('password').isLength({min:6}).withMessage("email must be atleast 6 character long"),
    userController.createUserController);


router.post("/login",
    body('email').isEmail().withMessage("email must be a valid email address"),
    body('password').isLength({min:6}).withMessage("email must be atleast 6 character long"),
    userController.loginUserController);

export default router;

