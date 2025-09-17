import express from 'express';
import { registerUser, loginUser, creditUser } from '../controllers/userController.js';
import authUser from '../middlewares/auth.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/credits',authUser, creditUser); 


export default router;