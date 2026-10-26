import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Movie from './models/Movie.js';
dotenv.config();

const date = offset => {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const sampleMovies = [
  { title:'The Last Orbit', description:'A daring crew races against time to save a stranded research station beyond the edge of known space.', genre:['Sci-Fi','Adventure'], language:'English', duration:'2h 08m', rating:8.7, year:2026, featured:true, poster:'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', shows:[] },
  { title:'Midnight Promise', description:'Two strangers discover that one unexpected night can change the direction of an entire life.', genre:['Drama','Romance'], language:'Hindi', duration:'2h 02m', rating:8.1, year:2026, featured:true, poster:'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', shows:[] },
  { title:'Shadow Protocol', description:'An analyst must uncover a conspiracy before a city-wide blackout turns into a global crisis.', genre:['Action','Thriller'], language:'English', duration:'2h 16m', rating:7.9, year:2025, featured:false, poster:'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', shows:[] },
  { title:'Monsoon Letters', description:'A heartfelt story of family, memory, and the letters that reconnect three generations.', genre:['Drama'], language:'Hindi', duration:'1h 54m', rating:8.4, year:2025, featured:false, poster:'https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg', shows:[] },
  { title:'Neon Chase', description:'A street racer gets one final chance to make things right during a city-wide night race.', genre:['Action','Adventure'], language:'English', duration:'2h 01m', rating:7.6, year:2026, featured:false, poster:'https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg', shows:[] },
  { title:'The Quiet House', description:'A family moves into a peaceful old home where every room holds a story worth hearing.', genre:['Mystery','Thriller'], language:'Hindi', duration:'1h 48m', rating:7.8, year:2025, featured:false, poster:'https://image.tmdb.org/t/p/w500/4HWAQu28e2yaWrtupFPGFkdNU7V.jpg', shows:[] }
].map((m, i) => ({ ...m, shows: [
  { theatre:'IMovies Central', date:date(0), time:'12:30 PM', price:180 },
  { theatre:'IMovies Central', date:date(0), time:'04:15 PM', price:220 },
  { theatre:'IMovies Grand', date:date(1), time:'07:30 PM', price:250 }
]}));

export async function seedMovies() {
  if (await Movie.countDocuments() === 0) {
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies added');
  }
}
if (process.argv[1]?.endsWith('seed.js')) {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/imovies')
    .then(async () => { await seedMovies(); await mongoose.disconnect(); })
    .catch(err => { console.error(err); process.exit(1); });
}
