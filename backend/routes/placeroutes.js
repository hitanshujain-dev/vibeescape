const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const place = require('../models/place');

// ─────────────────────────────────────────
// Route 1: GET /api/places
// Get all places OR filter by city/mood
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { city, mood } = req.query;

    let filter = {};

    if (city) {
      filter.city = city;         // filter by city
    }

    if (mood) {
      filter.moods = mood;        // filter by mood tag
    }

    const places = await place.find(filter);
    res.json(places);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─────────────────────────────────────────
// Route 2: GET /api/places/:id
// Get single place by ID
// ─────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {

    // Check if ID format is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid place ID format' });
    }

    const foundplace = await place.findById(req.params.id);

    if (!foundplace) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.json(foundplace);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;