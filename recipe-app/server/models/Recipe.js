const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please enter recipe name'],
        trim: true,
        minlength: [3, 'Recipe name must be at least 3 characters long'],
        maxlength: [100, 'Recipe name cannot exceed 100 characters']
    },
    category: {
        type: String,
        required: [true, 'Please enter recipe category'],
        enum: {
      values: ['Italian', 'Mexican', 'Indian', 'Chinese', 'American', 'Greek', 'Japanese', 'Dessert', 'Salad', 'Breakfast', 'Lunch', 'Dinner'],
      message: 'Please select a valid category'
    }
    },

    difficulty: {
        type: String,
        required: [true, 'Please enter recipe difficulty'],
         enum: {
      values: ['Easy', 'Medium', 'Hard'],
      message: 'Difficulty must be Easy, Medium, or Hard'
    }
    },

    cookingTime: {
        type: Number,
        required: [true, 'Please enter cooking time in minutes'],
        min: [1, 'Cooking time must be at least 1 minute'],
        max: [1440, 'Cooking time cannot exceed 1440 minutes (24 hours)']
    },
    servings: {
        type: Number,
        required: [true, 'Please enter number of servings'],
        min: [1, 'Servings must be at least 1'],
        max: [100, 'Servings cannot exceed 100']
    },
    ingredients: {
        type: [String],
        required: [true, 'Please enter ingredients'],
        minlength: [1, 'At least one ingredient is required']
    },
    instructions: {
        type: [String],
        required: [true, 'Please enter cooking instructions'],
        minlength: [1, 'At least one instruction step is required']
    },

    image: {
        type: String,
        default: 'https://via.placeholder.com/150'

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


recipeSchema.index({ user: 1, createdAt: -1 });
recipeSchema.index({ category: 1 });

module.exports = mongoose.model('Recipe', recipeSchema);
