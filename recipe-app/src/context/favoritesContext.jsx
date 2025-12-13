
import { createContext , useState , useContext } from "react";

export const FavoritesContext = createContext();

export function useFavorites() {

    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
//favorites provider component
export function FavoritesProvider( {children} ) {

    const [favoritess , setFavorites] = useState ([]);
//add to favorites
    const addFavorite = (recipe) => {

        const exists = favoritess.find (fav => fav.id === recipe.id || fav.idMeal === recipe.idMeal);

        if (!exists) {
            setFavorites ([...favoritess , recipe]);
      console.log('Added to favorites:', recipe);
        }
    };

    //remove from favorites

    const removeFavorite = (recipeId) => {
        setFavorites (favoritess.filter (fav => fav.id !== recipeId && fav.idMeal !== recipeId));
        console.log('Removed from favorites:', recipeId);
    };


    //if recipe is favorite
    const isFavorite = (recipeId) => {
        return favoritess.some (fav => fav.id === recipeId || fav.idMeal === recipeId);
    };

    const toggleFavorite = (recipe) => {
        const recipeId = recipe.id || recipe.idMeal;
        if (isFavorite (recipeId)) {
            removeFavorite (recipeId);
        } else {
            addFavorite (recipe);
        }
    };
//clear all favorites
    const clearFavorites = () => {
        setFavorites ([]);
        console.log('Cleared all favorites');
    };

//context value
    const value = {
        favoritess,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        favoritesCount: favoritess.length
    };



    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
