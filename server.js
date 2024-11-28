import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import Router from './api/user/index.js';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', Router);

mongoose.connect("mongodb+srv://sangvo22026526:5anG15122003@cluster0.rcd65hj.mongodb.net/anime_tango2"),{
  useNewUrlParser: true,
  useUnifiedTopology: true
}.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));