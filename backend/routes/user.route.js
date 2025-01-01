import {Router} from 'express'
import * as userController from "../controllers/user.controller.js"
// if theres a lot of named import from a file use above * method instead of manually listing all functions in { }

import { body } from 'express-validator';
import * as authMiddleware from "../middlewares/auth.middleware.js";



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

router.get("/profile", authMiddleware.authUser, userController.profileController)

router.get("/logout", authMiddleware.authUser, userController.logoutController)

export default router;

