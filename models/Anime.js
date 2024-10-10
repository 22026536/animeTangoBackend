import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  episodes: [{ type: String }],
  description: { type: String },
  lessons: [{ type: String }],
});

export default mongoose.model('Anime', animeSchema);