// File: src/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication.js'); // Updated import statement

router.use(authenticateToken);

// Protected route
router.get('/', (req, res) => {
  res.send(`Welcome, ${req.user.username}! This route is protected.`);
});

module.exports = router;