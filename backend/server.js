const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db');
const placeRoutes = require('./routes/placeroutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware (must come BEFORE routes) ────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:4173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());

// ─── Connect to MongoDB ──────────────────────────────────────────
connectDB();

// ─── Routes ─────────────────────────────────────────────────────
app.use('/api/places', placeRoutes);

// Health check route (only ONE — the duplicate has been removed)
const Place = require('./models/place');
app.get('/', async (req, res) => {
  try {
    const count = await Place.countDocuments();
    res.json({
      message: '🌍 VibeEscape API is running!',
      placesInDB: count,
      env: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// ─── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
