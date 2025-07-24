const bcrypt = require('bcrypt');
const saltRounds = 10;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors({ origin: '*' }));
const bodyParser = require('body-parser');

const app = express();

// ✅ FIXED: Use proper CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend URL
  credentials: true
}));

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/login-app')
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Register API
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Start server
app.listen(5000,'0.0.0.0', () => {
  console.log('🚀 Server running on http://localhost:5000');
});
