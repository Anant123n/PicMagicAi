import express from 'express';
import { registerUser, loginUser, creditUser, paymentRazorpay,verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/credits',authUser, creditUser); 
router.post('/pay-razor', authUser, paymentRazorpay);
router.post('/verify-razor', verifyRazorpay);



export default router;
