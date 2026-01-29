const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        id: {
            type: String,
            required: true
        },
        recipeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
        name: {
            type: String,
            required: true
        },
        category: String,
        difficulty: String,
        cookTime: Number,
        servings: Number,
        ingredients: String,
        instructions: String,
        image: String,
        source: {
            type: String,
            enum: ['user', 'api'],
            default: 'user'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

favoriteSchema.index({ user: 1, 'recipe.id': 1 }, { unique: true });
favoriteSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Favorite', favoriteSchema);


    

