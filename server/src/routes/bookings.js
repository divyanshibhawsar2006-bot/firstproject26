import { Router } from 'express';
import crypto from 'node:crypto';
import Booking from '../models/Booking.js';
import Movie from '../models/Movie.js';
import auth from '../middleware/auth.js';
const router = Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (e) { next(e); }
});
router.post('/', auth, async (req, res, next) => {
  try {
    const { movieId, showId, seats } = req.body;
    if (!movieId || !showId || !Array.isArray(seats) || seats.length < 1 || seats.length > 10)
      return res.status(400).json({ message: 'Choose a show and between 1 and 10 seats.' });
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found.' });
    const show = movie.shows.id(showId);
    if (!show) return res.status(404).json({ message: 'Show not found.' });
    const cleanSeats = [...new Set(seats.map(s => String(s).trim()))];
    if (cleanSeats.length !== seats.length || cleanSeats.some(s => !/^[A-J](0[1-9]|1[0-2])$/.test(s)))
      return res.status(400).json({ message: 'One or more seat labels are invalid.' });
    const existing = await Booking.findOne({
      movie: movie._id, showDate: show.date, showTime: show.time, theatre: show.theatre,
      seats: { $in: cleanSeats }
    });
    if (existing) return res.status(409).json({ message: 'One or more seats have already been booked. Please choose different seats.' });
    const booking = await Booking.create({
      user: req.user.id, movie: movie._id, movieTitle: movie.title,
      theatre: show.theatre, showDate: show.date, showTime: show.time,
      seats: cleanSeats, total: show.price * cleanSeats.length,
      bookingCode: 'IM' + crypto.randomBytes(4).toString('hex').toUpperCase()
    });
    res.status(201).json({ booking });
  } catch (e) { next(e); }
});
export default router;
