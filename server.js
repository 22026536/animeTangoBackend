import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import Router from './api/user/index.js';
import corMw from "./middlewares/cors.js";
import redisClient from "./models/connectRedis.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const app = express();

await redisClient.connect()
app.options('*', corMw);
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.set('trust proxy', 1);
app.use(cookieParser());
app.use('/api', Router);

// Kết nối MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Tăng thời gian chờ lên 30 giây
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
