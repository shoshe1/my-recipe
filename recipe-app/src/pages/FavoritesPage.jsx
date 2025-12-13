import { useState } from 'react';
import { useFavorites } from '../context/favoritesContext'; 

import RecipeCard from '../components/RecipeCard';
import './FavoritesPage.css';
import RecipeModal from '../components/RecipeModal';


function FavoritesPage() {
    const { favoritess , clearFavorites } = useFavorites();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };

    const handleClearFavorites = () => {
        if (window.confirm('Are you sure you want to clear all favorites?')) {
            clearFavorites();
        }
    };

    return (
        <div className="favorites-page">
            <div className="favorites-header">
                <h1 className='page-title'>My Favorite Recipes</h1>
                <p className='page-subtitle'>
                    You have {favoritess.length} favorite {favoritess.length === 1 ? 'recipe' : 'recipes'}.
                </p>

                {favoritess.length > 0 && (
                    <button onClick={handleClearFavorites} className='clear-all-btn'>
                        Clear All Favorites
                    </button>
                )}
            </div>

            {
                favoritess.length > 0 ? (
                    <div className="recipe-grid">
                        {favoritess.map((recipe) => (
                            <RecipeCard
                                key={recipe.id || recipe.idMeal}
                                recipe={recipe}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='empty-favorites'>
                        <div className='empty-icon'> 🍽️</div>
                        <h2>You have no favorite recipes yet.</h2>
                    </div>
                )}

            {showModal && selectedRecipe && (
                <RecipeModal recipe={selectedRecipe} onClose={closeModal} />
            )}
        </div>
    );
}
export default FavoritesPage;