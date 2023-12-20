const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const Subscription = require('../models/Subscription');

// Protected route to subscribe to newsletters
router.post('/subscribe', authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user._id;

    // Check if the user is already subscribed
    const existingSubscription = await Subscription.findOne({ user: userId });
    if (existingSubscription) {
      return res.status(400).json({ message: 'You are already subscribed' });
    }

    // Create a new subscription
    const newSubscription = new Subscription({ user: userId, email });
    await newSubscription.save();

    res.status(201).json({ message: 'Subscription successful', subscription: newSubscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to get the user's subscription status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if the user is subscribed
    const userSubscription = await Subscription.findOne({ user: userId });
    res.status(200).json({ isSubscribed: !!userSubscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
