import userModel from "../models/user.model.js"


export const createUser=async({email,password})=>{
    if(!email || !password){
        throw new Error("email and password are required")
    }


    const hashedPassword= await userModel.hashPassword(password)

    const user = await userModel.create({
        email,
        password:hashedPassword
    })

    return user; 
}

export const loginUser = async ({ email, password }) => {
    // Check if email and password are provided by the user
    if (!email || !password) {
        throw new Error("email and password are required");
    }

    // Check if user exists in db
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        throw new Error("user not found");
    }

    // Check if password is correct by comparing the hashed password stored in db
    const isMatch = await user.isValidPassword(password); // Pass the incoming password here
    if (!isMatch) {
        throw new Error("invalid password");
    }

    // If user exists and password is correct then return the user
    return user;
};

