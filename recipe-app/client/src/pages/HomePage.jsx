import { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { recipesAPI } from '../services/api';
import './HomePage.css';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipesAPI.getAll();
      setRecipes(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleDelete = (deletedRecipeId) => {
    // Remove the deleted recipe from state
    setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== deletedRecipeId));
  };

  const categories = ['All', ...new Set(recipes.map(recipe => recipe.category))];

  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  const totalRecipes = recipes.length;
  const avgCookTime = recipes.length > 0 
    ? Math.round(recipes.reduce((sum, recipe) => sum + (recipe.cookingTime || recipe.cookTime || 0), 0) / recipes.length)
    : 0;

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="loading-spinner">⏳</div>
          <p>Loading your recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="home-header">
        <div className="home-title-section">
          <h1 className="page-title">My Recipe Collection</h1>
          <p className="page-subtitle">
            {recipes.length > 0 
              ? 'Organize and manage your favorite recipes'
              : 'Start by creating your first recipe!'
            }
          </p>
        </div>

        {error && (
          <div className="error-banner">
            ❌ {error}
          </div>
        )}

        <div className="home-stats">
          <div className="stat-card">
            <span className="stat-number">{totalRecipes}</span>
            <span className="stat-label">Total Recipes</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{avgCookTime}</span>
            <span className="stat-label">Avg Cook Time (min)</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Categories</span>
          </div>
        </div>
      </div>

      <div className="category-filter">
        <h3>Filter by Category:</h3>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard 
            key={recipe._id || recipe.id} 
            recipe={recipe}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {filteredRecipes.length === 0 && !loading && (
        <div className="no-recipes">
          <div className="empty-icon">📝</div>
          <h2>
            {recipes.length === 0 
              ? 'No recipes yet' 
              : 'No recipes found in this category'
            }
          </h2>
          <p>
            {recipes.length === 0 
              ? 'Create your first recipe to get started!'
              : 'Try selecting a different category.'
            }
          </p>
        </div>
      )}

      {showModal && selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default HomePage;