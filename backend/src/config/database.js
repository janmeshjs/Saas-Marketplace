// File: src/config/database.js

const mongoose = require('mongoose');
const User = require('../models/User'); // Import the User model

const init = () => {
  // Connect to your MongoDB database
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  // Initialize models
  User.init();
};

module.exports = { init };
