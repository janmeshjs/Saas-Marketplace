const nodemailer = require('nodemailer');

// Function to send a password reset email
const sendPasswordResetEmail = async (recipientEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email
      pass: process.env.EMAIL_PASSWORD, // Use environment variable for password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use environment variable for sender email
    to: recipientEmail,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = { sendPasswordResetEmail };
