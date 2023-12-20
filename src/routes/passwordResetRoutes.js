const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { sendPasswordResetEmail } = require('../utils/email');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');

// Route to request a password reset
router.post('/request', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique token for password reset
    const resetToken = uuidv4();

    // Save the reset token in the database
    const resetTokenObject = new PasswordResetToken({
      user: user._id,
      token: resetToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Token expires in 24 hours
    });
    await resetTokenObject.save();

    // Send an email with the password reset link
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to reset the password with a valid token
router.post('/reset', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the reset token in the database
    const resetTokenObject = await PasswordResetToken.findOne({ token }).populate('user');
    if (!resetTokenObject || resetTokenObject.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and delete the reset token
    const user = resetTokenObject.user;
    user.password = hashedPassword;
    await user.save();
    await resetTokenObject.delete();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
