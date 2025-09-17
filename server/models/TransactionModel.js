
import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema({
    userid:{type:String, required:true},
    plan:{type:String, required:true, unique:true},
    amount:{type:Number, required:true},
    credit:{type:Number, required:true},
    payment:{type:Boolean, required:fasle},
    date:{type:Date, default:Date.now}
    
})

const userModel= mongoose.model.user|| mongoose.model('user', userSchema) ;


export default userModel;