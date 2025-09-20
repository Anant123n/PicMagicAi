import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },   // fixed field name
  plan: { type: String, required: true },     // removed unique
  amount: { type: Number, required: true },
  credit: { type: Number, required: true },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  orderId: { type: String, required: true, unique: true }  // store Razorpay order id
});

const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);

export default transactionModel;
