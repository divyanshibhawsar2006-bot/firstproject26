import mongoose from 'mongoose';
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  movieTitle: { type: String, required: true },
  theatre: { type: String, required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  seats: [{ type: String, required: true }],
  total: { type: Number, required: true },
  bookingCode: { type: String, required: true, unique: true }
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
