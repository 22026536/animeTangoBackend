import mongoose from 'mongoose';

const userRatingSchema = new mongoose.Schema({
    rating_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    anime_id: { type: Number, required: true, index: true },
    rating: { type: Number, min: 0, max: 10, require: true },
});

export default mongoose.model('UserRating', userRatingSchema);