import userModel from "../models/userModel";
import FormData from "form-data";
import axios from "axios";



export const generateImage=async (req,res)=>{
    try{
        const {prompt,UserId}=req.body;

        const User=await userModel.findById(UserId);

        if(User.credit<=0){
            return res.json({success:false,message:"Insufficient Credits Please Recharge"});
        }

        const formData=new FormData();  
        formData.append("prompt",prompt);

        const { data } = await axios.post('https://clipdrop-api.co/cleanup/v1', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.api_key ,
            },
            responseType: 'arraybuffer',
            data: formData  
        })

        const base64Image=Buffer.form(data,'binary').toString('base64');    
        const resultImage=`data:image/png;base64,${base64Image}`;
            
        User.credit-=1;
        await User.save();  
        res.status(200).json({success:true,message:"Image Generated Successfully",resultImage,credit:User.credit});

        
    
    
    }

    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Error in Generating Image"});  
    }





}        