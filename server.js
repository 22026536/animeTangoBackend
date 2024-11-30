import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { json } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import Router from './api/user/index.js';
import corMw from "./middlewares/cors.js";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Bỏ secure nếu không dùng HTTPS
}));
app.options('*', corMw);
app.use(express.urlencoded({ extended: true }))
app.use(json());
app.set('trust proxy', 1)
app.use(cookieParser());
app.use('/api', Router);

mongoose.connect("mongodb+srv://sangvo22026526:5anG15122003@cluster0.rcd65hj.mongodb.net/anime_tango2"),{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Tăng thời gian chờ lên 30 giây
};

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));