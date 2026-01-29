import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipesAPI } from '../services/api';
import './RecipeModal.css';

function RecipeModal({ recipe, onClose, onDelete }) {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);

    // Check if this is a user recipe (has _id from MongoDB)
    const isUserRecipe = recipe._id || (recipe.user && !recipe.idMeal);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) {
            return;
        }

        try {
            setDeleting(true);
            await recipesAPI.delete(recipe._id);
            alert('Recipe deleted successfully!');
            onClose();
            if (onDelete) {
                onDelete(recipe._id);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert(error.response?.data?.message || 'Failed to delete recipe');
        } finally {
            setDeleting(false);
        }
    };

    const handleEdit = () => {
        // Navigate to form page with recipe data
        navigate('/form', { state: { recipe } });
        onClose();
    };

    const getIngredientsList = () => {
        // For user recipes
        if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            return recipe.ingredients;
        }

        // For API recipes
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    const getInstructionsList = () => {
        // For user recipes
        if (recipe.instructions && Array.isArray(recipe.instructions)) {
            return recipe.instructions;
        }

        // For API recipes (split by period or newline)
        if (recipe.strInstructions) {
            return recipe.strInstructions.split(/\r?\n/).filter(line => line.trim());
        }

        return [];
    };

    const ingredientsList = getIngredientsList();
    const instructionsList = getInstructionsList();
    return (
         <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e)=>e.stopPropagation()}>
              <button className='modal-close' onClick={onClose}>
                ×
              </button> 
                
                <div className='modal-header'>
                    <img 
                        src={recipe.image || recipe.strMealThumb} 
                        alt={recipe.name || recipe.strMeal}
                        className='modal-image' 
                    />

                    <div className='modal-title-section'>
                        <h2>{recipe.name || recipe.strMeal}</h2>
                        <div className='modal-tags'>
                            {(recipe.category || recipe.strCategory) && (
                                <span className='modal-tag category-tag'>
                                    {recipe.category || recipe.strCategory}
                                </span>
                            )}
                            {(recipe.difficulty || recipe.strArea) && (
                                <span className='modal-tag area-tag'>
                                    {recipe.difficulty || recipe.strArea}
                                </span>
                            )}
                            {recipe.cookingTime && (
                                <span className='modal-tag'>
                                    ⏱ {recipe.cookingTime} min
                                </span>
                            )}
                            {recipe.servings && (
                                <span className='modal-tag'>
                                    🍽 {recipe.servings} servings
                                </span>
                            )}
                        </div>

                        {/* Edit and Delete buttons for user recipes */}
                        {isUserRecipe && (
                            <div className='modal-actions' style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={handleEdit}
                                    className='edit-btn'
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✏️ Edit Recipe
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className='delete-btn'
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: deleting ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        opacity: deleting ? 0.6 : 1
                                    }}
                                >
                                    {deleting ? '🗑️ Deleting...' : '🗑️ Delete'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className='modal-body'>
                    <div className='modal-section'>
                        <h3>Ingredients</h3>
                        <ul className='ingredients-list'>
                            {ingredientsList.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='modal-section'>
                        <h3>Instructions</h3>
                        {instructionsList.length > 0 ? (
                            <ol className='instructions-list'>
                                {instructionsList.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ol>
                        ) : (
                            <p className='instructions-text'>{recipe.strInstructions || 'No instructions available'}</p>
                        )}
                    </div>

                    {recipe.strYoutube && (
                        <div className='modal-section'>
                            <h3>Video Tutorial</h3>
                            <a
                                href={recipe.strYoutube}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='youtube-link'
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecipeModal;
