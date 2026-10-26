# IMovies — MERN Movie Booking Website

A starter full-stack implementation for the IMovies Skill Wallet project. It includes a responsive React interface, Express REST API, MongoDB models, JWT authentication, movie search, show selection, seat selection, and booking history.

## Requirements
- Node.js 18+ (your installed Node 26 should also work)
- MongoDB local service or MongoDB Atlas connection string

## 1. Configure the backend
Open a terminal in `server`:
```powershell
npm.cmd install
Copy-Item .env.example .env
```
Edit `server/.env` and set `MONGO_URI`. Keep secrets private.

Start the backend:
```powershell
npm.cmd run dev
```
API runs at `http://localhost:5000`. On first start, sample movies are inserted if the movie collection is empty.

## 2. Configure the frontend
Open another terminal in `client`:
```powershell
npm.cmd install
npm.cmd run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Features
- Browse and search a movie catalogue
- Movie details and showtimes
- Seat selection with a simple booking flow
- Register/login using JWT
- Booking history
- MongoDB persistence for users, movies, and bookings
- Responsive dark cinema-inspired UI

## Important notes
- This is a complete starter project, not a connection to a live cinema chain or payment provider.
- Demo showtimes and movie records are sample data. Update them for your project submission.
- No real payment processing is included.
- For production deployment, configure HTTPS, secure secrets, rate limiting, stronger validation, and a managed MongoDB database.
