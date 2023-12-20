// File: src/config/index.js
const helmet = require('helmet');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const database = require('./database');
const passport = require('./passport'); // Add this line
const session = require('express-session'); // Add this line
const { initializeSocketServer } = require('./socketServer'); // Add this line
const http = require('http');

require('dotenv').config();
const app = express();
app.use(helmet());
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Configure express-session middleware
app.use(
  session({
    secret: '1234asdf', // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Database initialization
database.init();

const { authorize } = require('../middleware/authorization'); // Add this line

// Routes (You'll define routes in the routes directory)
const userRoutes = require('../routes/userRoutes'); // Import userRoutes
const productRoutes = require('../routes/productRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const reviewRoutes = require('../routes/reviewRoutes'); // Add this line
const subscriptionRoutes = require('../routes/subscriptionRoutes'); // Add this line
const activityRoutes = require('../routes/activityRoutes'); // Add this line
const passwordResetRoutes = require('../routes/passwordResetRoutes'); // Add this line
const authRoutes = require('../routes/authRoutes'); // Add this line

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes); // Add this line
app.use('/api/subscriptions', subscriptionRoutes); // Add this line
app.use('/api/activity', activityRoutes); // Add this line
app.use('/api/password-reset', passwordResetRoutes); // Add this line
app.use('/auth', authRoutes); // Add this line


// Error handling middleware (should be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Create HTTP server
const server = http.createServer(app);
initializeSocketServer(server); // Initialize WebSocket server


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
