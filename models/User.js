import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true },
    password : { type: String, required: true },
    user_img : { type: String, default: null },
    email : { type: String, required: true },
    phone_number : { type: String, required: true },
    full_name : { type: String, required: true },
    sex : { type: Number, required: true },
    date_of_birth : { type: Date, required: true },
    role : { type: Number, required: true, default: 0 },
    reset_token : { type: String, default: null },
    reset_token_expire : { type: String, default: null },
});

export default mongoose.model('User', userSchema);