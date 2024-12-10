import mongoose from 'mongoose';

const userCommendSchema = new mongoose.Schema({
    User_id: { type: Number, required: true, index: true },
    Anime_id: { type: Number, required: true },
    Comment: { type: String },
    Time: { type: Date, require: true}
}, {
    collection: 'UserCommend' // Định rõ tên collection
  });

export default mongoose.model('UserHistory', userCommendSchema);