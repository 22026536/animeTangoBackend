import mongoose from 'mongoose';

const userRatingSchema = new mongoose.Schema({
    Rating_id: { type: Number, required: true, unique: true },
    User_id: { type: Number, required: true },
    Anime_id: { type: Number, required: true, index: true },
    Rating: { type: Number, min: 0, max: 10, require: true },
}, {
    collection: 'UserRating' // Định rõ tên collection
  });

export default mongoose.model('anime_tango2', userRatingSchema);