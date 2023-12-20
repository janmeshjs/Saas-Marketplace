const express = require('express');
const passport = require('../config/passport');
require('dotenv').config();

const router = express.Router();

// Route to initiate Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/'); // Redirect to the home page after successful login
});

// Route to log out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
