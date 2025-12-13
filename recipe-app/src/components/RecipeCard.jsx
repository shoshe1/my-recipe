import './RecipeCard.css';
import {useFavorites} from '../context/favoritesContext';

function RecipeCard({ recipe , onCardClick}) {

    const {isFavorite, toggleFavorite} = useFavorites();
const recipeId = recipe.id || recipe.idMeal;
const isInFavorites = isFavorite(recipeId);

const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
};

const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'green';
        case 'medium':
            return 'orange';
        case 'hard':
            return 'red';
        default:
            return 'gray';
    }

};
    return (
        <div className="recipe-card" onClick={() => onCardClick && onCardClick(recipe)}>
            <div className="recipe-card-image">
                <img   src={recipe.image || recipe.strMealThumb } 
          alt={recipe.name || recipe.strMeal} />
          <div className="recipe-card-category">
            {recipe.category || recipe.strCategory || 'General'}
          </div>
            


<button
className={`favorite-btn ${isInFavorites ? 'favorited' : ''}`} onClick={handleFavoriteClick}
title={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}>
    {isInFavorites ? '❤️' : '🤍'}
</button>

</div>
            <div className="recipe-card-content">
                <h3 className="recipe-card-title">{recipe.name || recipe.strMeal}</h3>
                
                <div className="recipe-card-meta">
                    {recipe.difficulty && (
                        <span 
                        className={`recipe-badge ${getDifficultyColor(recipe.difficulty)}`}>
                            {recipe.difficulty}
                        </span>
                    )}
                    {recipe.cookTime && (
                        <span className="recipe-info">
                            ⏱ {recipe.cookTime} min
                        </span>
                    )}
                    {recipe.servings && (
                        <span className="recipe-info">
                            🍽 {recipe.servings} serving
                        </span>
                    )}
                </div>
                {recipe.ingredients && (
                <p className="recipe-card-ingredients">
                    {recipe.ingredients || recipe.strIngredients}
                </p>
                )}
                </div>
                </div>
    );
}
export default RecipeCard;