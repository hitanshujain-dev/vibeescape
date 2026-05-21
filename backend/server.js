const express = require('express')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./db')
const placeRoutes = require('./routes/placeroutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:4173']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  credentials: true,
}))

app.use(express.json())

connectDB()

app.use('/api/places', placeRoutes)
app.use('/api/auth', authRoutes)

const Place = require('./models/place')
const User = require('./models/User')

app.get('/', async (req, res) => {
  try {
    const [places, users] = await Promise.all([
      Place.countDocuments(),
      User.countDocuments(),
    ])
    res.json({
      message: '🌍 VibeEscape API is running!',
      placesInDB: places,
      usersInDB: users,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})