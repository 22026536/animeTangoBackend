import mongoose from 'mongoose';

const animeSchema = new mongoose.Schema({
  anime_id	:{ type: Number, required: true, unique: true , index: true},
  Name: { type: String, required: true },
  English_Name: { type: String, required: true },
  Score: { type: Number, required: true },
  Genres : { type: String, required: true },
  Synopsis: { type: String, required: true },
  Type : { type: String, required: true },
  Episodes: [{ type: String, required: true }],
  Aired: { type: String, required: true },
  Premiered: { type: String, required: true },
  Status: { type: String, required: true },
  Producers: { type: String, required: true },
  Licensors: { type: String, required: true },
  Studios: { type: String, required: true },
  Source: { type: String, required: true },
  Duration: { type: String, required: true },
  Old: { type: String, required: true },
  Rank: { type: Number, required: true },
  Popularity: { type: Number, required: true  },
  Favorites: { type: Number, required: true  },
  Scored_By: { type: Number, required: true  },
  Member: { type: Number, required: true  },
  Image_URL:{ type: String, required: true  },
  JanpaneseLevel: {type: String, required: true}
});

export default mongoose.model('Anime', animeSchema);