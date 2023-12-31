const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authentication');
const Review = require('../models/Review');

// Protected route to add a review for a product
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if the user has already reviewed the product
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Create a new review
    const newReview = new Review({ user: userId, product: productId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to get all reviews for a product
router.get('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    // Get all reviews for the specified product
    const reviews = await Review.find({ product: productId }).populate('user');
    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// // Route to delete a review
// router.delete('/:reviewId', authMiddleware.authenticateToken, async (req, res) => {
//     try {
//       const reviewId = req.params.reviewId;
  
//       // Check if the review exists
//       const review = await Review.findById(reviewId);
//       if (!review) {
//         return res.status(404).json({ message: 'Review not found' });
//       }
  
//       // Check if the user owns the review
//       if (review.user.toString() !== req.user.id) {
//         return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this review' });
//       }
  
//       // Delete the review
//       await review.remove();
  
//       res.status(200).json({ message: 'Review deleted successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
module.exports = router;
