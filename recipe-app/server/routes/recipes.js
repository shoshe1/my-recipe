const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/auth');



router.get('/', protect, async (req, res) => {

    try {
        const recipes = await Recipe.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.error('Get recipes error:', error);
        res.status(500).json({  
            success: false,
            message: 'Server error while fetching recipes',
            error: error.message
        });
    }   
});


router.get('/:id', protect, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        if(recipe.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this recipe'
            });
        }

        res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        console.error('Get recipe error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching the recipe',
            error: error.message
        });
    }
});

router.post('/', protect, async (req, res) => {
    try {
const { name, category, difficulty, cookingTime, servings, ingredients, instructions, image } = req.body;        
if(!name || !category || !difficulty || !cookingTime || !servings || !ingredients || !instructions) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }





        const recipe = await Recipe.create({
            user: req.user._id,
            name,
            category,
            difficulty,
            cookingTime:Number(cookingTime),
            servings:Number(servings),
            ingredients,
            instructions,
            image: image || undefined
        });




        res.status(201).json({
            success: true,
            message: 'Recipe created successfully',
            data: recipe
        });
    }

    catch (error) {
        console.error('Create recipe error:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }


        res.status(500).json({
            success: false,
            message: 'Server error while creating the recipe',
            error: error.message
        });
    }
});


router.put('/:id', protect, async (req, res) => {
    try {
        let recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });  
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }
        if(recipe.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this recipe'
            });
        }



        recipe = await Recipe.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true,
            runValidators: true
        });


        res.status(200).json({
            success: true,
            message: 'Recipe updated successfully',
            data: recipe
        });
    } catch (error) {
        console.error('Update recipe error:', error);


        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: messages
            });
        }


        res.status(500).json({
            success: false,
            message: 'Server error while updating the recipe',
            error: error.message
        });
    }
});


router.delete('/:id', protect, async (req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user._id });

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }




        if(recipe.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to delete this recipe'
            });
        }



        await recipe.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully',
            data: {}
        });
    }
    catch (error) {
        console.error('Delete recipe error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting the recipe',
            error: error.message
        });
    }

});


module.exports = router;


