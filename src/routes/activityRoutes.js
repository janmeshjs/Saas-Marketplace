const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const Activity = require('../models/Activity');

// Protected route to log user activity
router.post('/log', authenticateToken, async (req, res) => {
  try {
    const { type, details } = req.body;
    const userId = req.user._id;

    // Log the user activity
    const newActivity = new Activity({ user: userId, type, details });
    await newActivity.save();

    res.status(201).json({ message: 'Activity logged successfully', activity: newActivity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to get user activity logs
router.get('/logs', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all activity logs for the user
    const activityLogs = await Activity.find({ user: userId });
    res.status(200).json({ activityLogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
