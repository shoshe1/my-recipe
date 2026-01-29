import {useState} from 'react';

import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import './ApiPage.css';

import useFetch from '../hooks/useFetch';




function ApiPage() {

    const [searchTerm , setSearchTerm]= useState ('');

  const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [apiUrl , setApiUrl]= useState ('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const [showModal , setShowModal] = useState(false);


    const { data, loading, error, refetch } = useFetch(apiUrl);
    const recipes = data?.meals || [] ;


    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) { return;
    }
        setApiUrl (`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    };


    const handleRandomRecipe = () => {
        // Add timestamp to force refetch each time
        setApiUrl (`https://www.themealdb.com/api/json/v1/1/random.php?t=${Date.now()}`);
    };

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRecipe(null);
    };



    return (
        <div className="api-page">
            <div className="api-header">
                <h1 className="page-title">Explore Recipes from API</h1>
                <p className="page-subtitle">
                    Search and discover new recipes from an external API
                </p>
                </div>

                <div className='search-section'>
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm (e.target.value)}
                            placeholder="Search for recipes..."
                            className='search-input'
                        />
                        <button type="submit" className='search-btn'>
                            Search
                        </button>
                       
                    </form> 
                    <button type="button" onClick={handleRandomRecipe} disabled={loading}>
                            Random Recipe
                        </button>
                </div>
                   {loading &&(
                    <div className='loading-container'>
                    <div className='loading-spinner'> 🍳</div>
                    <p>Loading ...</p></div>
                   )} 


                   {error && !loading && (

                    <div className='error-container'>
<p className='error-message'>{error}</p>
</div>
                   )}
                
{
    !loading && !error && (!data?.meals || data.meals.length === 0) && (
        <div className='error-container'>
            <p className='error-message'>No recipes found. Try a different search term.</p>
        </div>
    )
}   
                   {!loading && !error && recipes.length > 0 && (
                    <div className='recipes-grid'>
                        {recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id || recipe.idMeal}
                                recipe={recipe}
                                onCardClick={handleCardClick}
                            />
                        ))}
                    </div>
                   )}


                   {
                    !loading && !error && recipes.length === 0 && (
                        <div className='no-results'>
                            <p>No recipes to display. Try searching for something!</p>
                        </div>
    )}



                     {showModal && selectedRecipe && (
                        <RecipeModal
                            recipe={selectedRecipe}
                            onClose={() => setShowModal (false)}
                        />
                     )}
                     </div>
                    );
                                }
export default ApiPage;