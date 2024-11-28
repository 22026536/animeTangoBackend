import mongoose from 'mongoose';

const userHistorySchema = new mongoose.Schema({
    User_id: { type: Number, required: true },
    Anime_id: { type: Number, required: true },
    Episode_id: { type: Number, required: true },
    Comment: { type: String },
}, {
    collection: 'UserHistory' // Định rõ tên collection
  });

export default mongoose.model('anime_tango2', userHistorySchema);