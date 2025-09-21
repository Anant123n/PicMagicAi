import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true }, // 🚫 remove `unique: true`
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);

export default transactionModel;


