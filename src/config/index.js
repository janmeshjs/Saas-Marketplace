// File: src/config/index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');


require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Database initialization
database.init();

// Routes (You'll define routes in the routes directory)
const userRoutes = require('../routes/userRoutes'); // Import userRoutes
const productRoutes = require('../routes/productRoutes');

// Use routes
console.log('Before userRoutes');
app.use('/api/users', userRoutes);
console.log('After userRoutes');

app.use('/api/products', productRoutes);


// Error handling middleware (should be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
