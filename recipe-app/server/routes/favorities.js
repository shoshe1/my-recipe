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




router.post('/', protect, async (req, res) => {

    try {
        const { recipe } = req.body;
        if (!recipe || !recipe.id || !recipe.name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide recipe with id and name'
            });
        }
        const existingFavorite = await Favorite.findOne({
            user: req.user._id,
            'recipe.id': recipe.id
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: 'Recipe already in favorites'
            });
        }

        const favorite = await Favorite.create({
            user: req.user._id,
            recipe: {
                id: recipe.id,
                recipeId: recipe.recipeId || null,
                name: recipe.name,
                image: recipe.image || recipe.strMealThumb,
                category: recipe.category || null,
                difficulty: recipe.difficulty || null,
                cookTime: recipe.cookTime || null,
                servings: recipe.servings || null,
                ingredients: recipe.ingredients || null,
                instructions: recipe.instructions || null,
                source: recipe.source || (recipe.idMeal ? 'api' : 'user')
            }
        });

        res.status(201).json({
            success: true,
            data: favorite
        });
    } catch (error) {
        console.error('Add favorite error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Recipe already in favorites'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error adding favorite',
            error: error.message
        });
    }
});

module.exports = router;