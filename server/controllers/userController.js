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

        if(password.length<8){
            return res.status(400).json({success:false,message:"Password must be at least b characters long"});
        }

        //

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const userData={
            name,
            email,
            password:hashedPassword
        }

        const user=new userModel(userData); 
        await user.save();

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.status(201).json({success:true,message:"User Registered Successfully",data:{user,token}});

        


    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Registering User"});
    }
}

const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({success:false,message:"Please Enter all the Fields"});
        }

        const user=await userModel.findOne({email});

        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }

        const isPasswordMatch=await bcrypt.compare(password,user.password);
        
        if(!isPasswordMatch){
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }   

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET);
        res.status(200).json({success:true,message:"User Logged In Successfully",data:{user,token}});
    
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Logging In"});


    }
    
    
    
    
    
    }

const creditUser=async (req,res)=>{
    try{
        const {Userid}=req.body;  
        
        const User=await userModel.findById(Userid);
        res.json({success:true,message:"User Credited Successfully",credits:User.credit,user:{name:User.name}});


     }

        catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Crediting User"});   
        }     
    
    
    
    
    }


export {registerUser,loginUser,creditUser};
