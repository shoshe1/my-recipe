import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
    try {
        const stored = localStorage.getItem("redux-favorites");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading favorites from localStorage: ", error);
        return [];
    }


};

const saveFavoritesToLocalStorage = (favorites) => {
    try {
        localStorage.setItem("redux-favorites", JSON.stringify(favorites));
    } catch (error) {
        console.error("Error saving favorites to localStorage: ", error);
    }   
};

const initialState = {
    items: loadFavoritesFromLocalStorage(),
    lastUpdated: null
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
    
            const recipe = action.payload;
            const recipeId = recipe.id || recipe.idMeal;
            const exists = state.items.find(item => (item.id === recipeId)||(item.idMeal === recipeId));
        
            if (!exists) {
                state.items.push(recipe);
                state.lastUpdated = new Date().toISOString();
                saveFavoritesToLocalStorage(state.items);
                console.log("Added to favorites: ", recipe);
            }
        },
        removeFavorite: (state, action) => {
            const recipeId = action.payload;
            state.items = state.items.filter(item => item.id !== recipeId && item.idMeal !== recipeId);
            state.lastUpdated = new Date().toISOString();
            saveFavoritesToLocalStorage(state.items);
            console.log("Removed from favorites: ", recipeId);
        },
        toggleFavorite: (state, action) => {
            const recipe = action.payload;
            const recipeId = recipe.id || recipe.idMeal;
            const existingIndex = state.items.findIndex(item => (item.id === recipeId)||(item.idMeal === recipeId));
            if (existingIndex >= 0) {
                state.items.splice(existingIndex, 1);
                console.log("Toggled off favorite: ", recipeId);
            } else {
                state.items.push(recipe);
                console.log("Toggled on favorite: ", recipe);
            }
            state.lastUpdated = new Date().toISOString();
            saveFavoritesToLocalStorage(state.items);
        },
            clearAllFavorites: (state) => {
            state.items = [];
            state.lastUpdated = new Date().toISOString();
            saveFavoritesToLocalStorage(state.items);
            console.log("Cleared all favorites");
        }
    }
});

export const { addFavorite, removeFavorite, toggleFavorite, clearAllFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.items.length;
export const selectIsFavorite = (state, recipeId) => {
    return state.favorites.items.some(item => (item.id === recipeId)||(item.idMeal === recipeId));
};
export const selectLastUpdated = (state) => state.favorites.lastUpdated;

export default favoritesSlice.reducer;