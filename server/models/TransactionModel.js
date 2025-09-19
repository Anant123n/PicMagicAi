
import mongoose from "mongoose";

const transactionSchema= new mongoose.Schema({
    userid:{type:String, required:true},
    plan:{type:String, required:true, unique:true},
    amount:{type:Number, required:true},
    credit:{type:Number, required:true},
    payment:{type:Boolean, required:false},
    date:{type:Date, default:Date.now}
    
})

const transactionModel= mongoose.model.transaction|| mongoose.model('transaction', transactionSchema) ;


export default transactionModel;