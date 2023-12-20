// File: src/middleware/authentication.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  // Extract the token without the "Bearer" prefix
  const token = authHeader.split(' ')[1];
  
  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = await User.findById(user.userId);
    next();
  });
};

module.exports = { authenticateToken };
