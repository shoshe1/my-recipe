import {useState , useEffect} from 'react';
import {searchRecipes , getRandomRecipe} from '../utils/api';

import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import './ApiPage.css';



function ApiPage() {
    const [recipes ,setRecipes]= useState ([]);
    const [searchTerm , setSearchTerm]= useState ('');
    const [loading , setLoading]= useState (false);
    const [error , setError]= useState (null);
    const [selectedRecipe , setSelectedRecipe]= useState (null);
    const [showModal , setShowModal]= useState (false);

    useEffect (() => {
        handleRandomRecipe();
    } ,[]);

    const fetchInitialRecipes = async () => {

        try
        {
            setLoading (true);
            setError ('');
            const data = await searchRecipes ('chicken');
            setRecipes (data || []  );
        }
        catch (error)
        {
            setError ('Failed to fetch recipes. Please try again later.');
        }
        finally
        {
            setLoading (false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        try {
            setLoading (true);
            setError ('');
            const data = await searchRecipes (searchTerm);
            if (!data || data.length === 0) {
                setError ('No recipes found for the given search term.');
                setRecipes ([]);
            } else {
                setRecipes (data);
            }
        } catch (error) {
            setError ('Failed to fetch recipes. Please try again later.');
        } finally {
            setLoading (false);
        }
    };

    const handleRandomRecipe = async () => {
        try {
            setLoading (true);
            setError ('');
            const data = await getRandomRecipe ();
            setRecipes ([data]);
        } catch (error) {
            setError ('Failed to fetch random recipe. Please try again later.');
        } finally {
            setLoading (false);
        }
    };

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
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
                    <p>Loading...</p></div>
                   )} 


                   {error && !loading && (

                    <div className='error-container'>
<p className='error-message'>{error}</p>
</div>
                   )}


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