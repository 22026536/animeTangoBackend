import mongoose from 'mongoose';

const userHistorySchema = new mongoose.Schema({
    History_id: {type: Number, require: true, unique: true , index: true},
    User_id: { type: Number, required: true },
    Anime_id: { type: Number, required: true },
    Episode_id: { type: Number, required: true },
    Comment: { type: String },
    TimeWatches: { type: Date, require: true}
}, {
    collection: 'UserHistory' // Định rõ tên collection
  });

  import AutoIncrementFactory from 'mongoose-sequence';

// Khởi tạo AutoIncrement plugin
const AutoIncrement = AutoIncrementFactory(mongoose);
userHistorySchema.plugin(AutoIncrement, { inc_field: 'History_id' });

export default mongoose.model('UserHistory', userHistorySchema);