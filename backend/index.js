const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const couponRoutes = require('./routes/couponRoutes');
require('dotenv').config();

const app = express();
console.log(process.env.CLIENT_URL);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Log incoming IPs for debugging
app.use((req, res, next) => {
  console.log(`Request from IP: ${req.ip}`);
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', couponRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));