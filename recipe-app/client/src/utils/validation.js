
export function validateRecipeForm(data) {
    const errors = {};

    if (!data.name || data.name.trim().length < 3) {
        errors.name = 'Recipe name must be at least 3 characters long.';
    }

    if (!data.category ) {
        errors.category = 'Category is required.';
    }

    if (!data.difficulty ) {
        errors.difficulty = 'Difficulty level is required.';
    }

    if (data.cookTime !== undefined && (isNaN(data.cookTime) || data.cookTime <= 0)) {
        errors.cookTime = 'Cook time must be a positive number.';
    }

    if (data.servings !== undefined && (isNaN(data.servings) || data.servings <= 0)) {
        errors.servings = 'Servings must be a positive number.';
    }
if (!data.ingredients || data.ingredients.trim().length === 0) {
        errors.ingredients = 'At least one ingredient is required.';
    }

    if (!data.instructions || data.instructions.trim().length === 0) {
        errors.instructions = 'Cooking instructions are required.';
    }
    return errors;

    }