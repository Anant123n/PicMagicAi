import jwt from 'jsonwebtoken';


const authUser=(req,res,next)=>{
    const token=req.headers

    if (!token) {
        return res.json({success:false,message:"Not Authorized Login"});
    }
 
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);

        if(token_decode.id){
            req.body.userId=token_decode.id;
            res.json({success:true,message:"User Authorized"})
        }
        else{
            res.json({success:false,message:"Not Authorized Login"})
        }

        next();
    }
    
    catch(error){
        return res.json({success:false,message:"Token is not valid"});
    }
    


}

export default authUser;