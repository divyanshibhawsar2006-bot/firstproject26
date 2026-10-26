import mongoose from 'mongoose';
const showSchema = new mongoose.Schema({
  theatre: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
}, { _id: true });
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  genre: [String],
  language: { type: String, default: 'Hindi' },
  duration: { type: String, default: '2h 15m' },
  rating: { type: Number, default: 8.0 },
  year: { type: Number, default: new Date().getFullYear() },
  poster: { type: String, default: '' },
  backdrop: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  shows: [showSchema]
}, { timestamps: true });
export default mongoose.model('Movie', movieSchema);
