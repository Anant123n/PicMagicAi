import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  credit: { type: Number, required: true },
  orderId: { type: String, required: true },
  payment: { type: Boolean, default: false },
  paymentId: { type: String },
  status: { type: String, default: 'pending' },
  date: { type: Date, default: Date.now },
}, { timestamps: true });


const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);

export default transactionModel;


