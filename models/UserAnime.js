import mongoose from 'mongoose';

const userAnimeSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, index: true }, // ID của người dùng
    anime_id: { type: Number, required: true, index: true }, // ID của anime
    lastestTimeWatched: { type: Date, required: true }, // Thời điểm xem gần nhất
    status: { type: Boolean, required: true }, // true: finished, false: unfinished
}, {
    collection: 'UserAnime', // Đặt tên collection
    timestamps: true, // Tự động thêm createdAt, updatedAt
});

export default mongoose.model('UserAnime', userAnimeSchema);