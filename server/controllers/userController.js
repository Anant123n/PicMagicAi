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

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(200).json({success:true,message:"User Logged In Successfully",data:{user,token}});
    
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Logging In"});


    }
    
    
    
    
    
    }

const creditUser = async (req, res) => {
  try {
    const userId = req.body.userId; // set by auth middleware

    const User = await userModel.findById(userId);

    if (!User) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User data fetched successfully",
      credits: User.credit,
      user: { name: User.name, email: User.email }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in fetching user credits" });
  }
};


const razorpayInstance= new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET


});


const paymentRazorpay=async (req,res)=>{
    try {
        const {userId,planId}=req.body;
        const userData=await userModel.findById(userId);    

        if(!userData){
            return res.status(404).json({success:false,message:"User not found"});
        }

        let amount,credit,plan,data;

        switch(planId){
            case 'Basic' :
                plan="Basic";
                amount=10;
                credit=15;
                break;

            case 'Advanced' :
                plan="Advanced";
                amount=30;
                credit=70;
                break;  
             
            case 'Premier' :
                plan="Premier";
                amount=50;
                credit=150;
                break;  

             default :  
                 return res.status(400).json({success:false,message:"Invalid Plan Selected"});




        }

        date=Date.now()

        const transactionData={
            userId,
            plan,
            amount,
            credit,
            date
        }

        const newTransaction=new transactionModel(transactionData);
        await newTransaction.save();

        const options={
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt:`${userId}#${newTransaction._id}#${date}`
             
        }

        await razorpayInstance.orders.create(options,(err,order)=>{
            if(err){
                console.log(err);
                return res.status(500).json({success:false,message:"Error in creating order"});
            }

            res.status(200).json({success:true,message:"Order created successfully",data:{order,plan,amount,credit}});
        });










    }

    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Payment"});

    }

}

const verifyRazorpay=async (req,res)=>{ 
    try{

        const {razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);     

        if(orderInfo.status!=="paid"){
            return res.status(400).json({success:false,message:"Payment not successful"});
        }

        
    }
}




export {registerUser,loginUser,creditUser};
