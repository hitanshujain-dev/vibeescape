const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
    },
    type: {
      type: String,       // ← your actual field
    },
    moods: {
      type: [String],     // ← your actual field
      default: [],
    },
    tag: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],     // ← array of image URLs
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    timing: {
      type: String,
    },
    budget: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;