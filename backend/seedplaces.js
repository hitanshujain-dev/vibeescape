const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./db');
const Place = require('./models/place');
const places = require('./data/places');

const seedDB = async () => {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Clear existing data (fresh start)
    await Place.deleteMany();
    console.log('🗑️  Old data cleared');

    // Step 3: Insert all places
    await Place.insertMany(places);
    console.log(`✅ ${places.length} places seeded successfully!`);

    // Step 4: Close connection
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();