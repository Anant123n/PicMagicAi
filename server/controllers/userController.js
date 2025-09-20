import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import transactionModel from "../models/TransactionModel.js";
import Razorpay from "razorpay";



// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "Please enter all the fields" });

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Please enter a valid email" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, credit: user.credit },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in registering user" });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Please enter all the fields" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email, credit: user.credit },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in logging in" });
  }
};


// Get User Credits
const creditUser = async (req, res) => {
  try {
    const userId = req.userId; // ✅ set by middleware
    const User = await userModel.findById(userId);

    if (!User) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "User data fetched successfully",
      credits: User.credit,
      user: { id: User._id, name: User.name, email: User.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in fetching user credits" });
  }
};








// Razorpay Instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId; // ✅ safer
    const { planId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let amount, credit, plan;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        amount = 10;
        credit = 15;
        break;
      case "Advanced":
        plan = "Advanced";
        amount = 30;
        credit = 70;
        break;
      case "Premier":
        plan = "Premier";
        amount = 50;
        credit = 150;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid Plan Selected" });
    }

    const date = Date.now();

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: `${userId}#${date}`,
    };

    const order = await razorpayInstance.orders.create(options);

    const transactionData = new transactionModel({
      userId,
      plan,
      amount,
      credit,
      date,
      orderId: order.id,
      payment: false,
    });
    await transactionData.save();

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: { order, plan, amount, credit },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in Payment" });
  }
};

// Verify Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not successful" });
    }

    const transactionData = await transactionModel.findOne({ orderId: razorpay_order_id });
    if (!transactionData) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (transactionData.payment) {
      return res.status(400).json({ success: false, message: "Payment already verified" });
    }

    const userData = await userModel.findById(transactionData.userId);
    const newCredit = userData.credit + transactionData.credit;

    await userModel.findByIdAndUpdate(transactionData.userId, { credit: newCredit });
    await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};

export { registerUser, loginUser, creditUser, paymentRazorpay, verifyRazorpay };
