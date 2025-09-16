import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// Register User

const registerUser=async (req, res) => {    

    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"Please Enter all the Fields"});
        }


        if(!validator.isEmail(email)){                  
            return res.status(400).json({success:false,message:"Please Enter a valid Email"});
        }

        if(!validator.isStrongPassword(password)){
            return res.status(400).json({success:false,message:"Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol."});
        }

        const existingUser=await userModel.findOne({email});

        
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Registering User"});
    }
}

