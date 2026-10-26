import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router = Router();
const makeToken = user => jwt.sign({ id: user._id, name: user.name, email: user.email },
  process.env.JWT_SECRET || 'development_only_secret', { expiresIn: '7d' });
const publicUser = user => ({ id: user._id, name: user.name, email: user.email });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 6)
      return res.status(400).json({ message: 'Enter your name, a valid email, and a password of at least 6 characters.' });
    if (await User.findOne({ email: email.toLowerCase().trim() }))
      return res.status(409).json({ message: 'An account with this email already exists.' });
    const user = await User.create({ name: name.trim(), email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ token: makeToken(user), user: publicUser(user) });
  } catch (e) { next(e); }
});
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: (req.body.email || '').toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password)))
      return res.status(401).json({ message: 'Email or password is incorrect.' });
    res.json({ token: makeToken(user), user: publicUser(user) });
  } catch (e) { next(e); }
});
router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    res.json({ user: publicUser(user) });
  } catch (e) { next(e); }
});
export default router;
