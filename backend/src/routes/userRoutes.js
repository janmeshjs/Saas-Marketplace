// File: src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import the bcrypt package
const { authorize } = require('../middleware/authorization');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    let role = 'user';
    if (email.endsWith('@yourdomain.com')) {
      role = 'admin';
    }

    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// User login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role, }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/admin-dashboard', authorize(['admin']), (req, res) => {
  res.send('Admin Dashboard');
});
module.exports = router;
