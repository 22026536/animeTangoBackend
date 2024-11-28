import mongoose from 'mongoose';

const animeEpisodeScheme = new mongoose.Schema({
    Episode_id: { type: Number, required: true, unique: true },
    Anime_id: { type: Number, required: true, index: true },
    Name: { type: String, required: true },
    Episode: { type: Number, require: true },
    UrlLink: { type: String },
    Aired: {type: Date}
}, {
    collection: 'AnimeEpisode' // Định rõ tên collection
  });

export default mongoose.model('AnimeEpisode', animeEpisodeScheme);