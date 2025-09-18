import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import imageRoutes from './routes/imageRoutes.js';



import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/image', imageRoutes);




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});     


