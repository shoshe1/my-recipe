const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const { protect } = require('../middleware/auth');


router.get('/', protect, async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id })
            .sort({ createdAt: -1 }); // Newest first

        res.status(200).json({
            success: true,
            count: favorites.length,
            data: favorites
        });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching favorites',
            error: error.message
        });
    }
});

module.exports = router;