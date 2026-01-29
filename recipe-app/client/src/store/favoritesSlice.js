import { createSlice } from "@reduxjs/toolkit";

// Get current user ID from localStorage
const getCurrentUserId = () => {
    try {
        const user = localStorage.getItem("user");
        if (user) {
            const userData = JSON.parse(user);
            return userData._id || userData.id;
        }
    } catch (error) {
        console.error("Error getting user ID:", error);
    }
    return null;
};

const loadFavoritesFromLocalStorage = () => {
    try {
        const userId = getCurrentUserId();
        if (!userId) return []; // No user logged in, return empty
        
        const stored = localStorage.getItem(`redux-favorites-${userId}`);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Error loading favorites from localStorage: ", error);
        return [];
    }
};

const saveFavoritesToLocalStorage = (favorites) => {
    try {
        const userId = getCurrentUserId();
        if (!userId) return; // Don't save if no user
        
        localStorage.setItem(`redux-favorites-${userId}`, JSON.stringify(favorites));
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
            state.items = state.items.filter(item => 
                item.id !== recipeId && 
                item.idMeal !== recipeId && 
                item._id !== recipeId
            );
            state.lastUpdated = new Date().toISOString();
            saveFavoritesToLocalStorage(state.items);
            console.log("Removed from favorites: ", recipeId);
        },
        toggleFavorite: (state, action) => {
            const recipe = action.payload;
            const recipeId = recipe.id || recipe.idMeal || recipe._id;
            const existingIndex = state.items.findIndex(item => 
                (item.id === recipeId) || 
                (item.idMeal === recipeId) || 
                (item._id === recipeId)
            );
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
        },
        // New action to load favorites for a specific user
        loadUserFavorites: (state) => {
            state.items = loadFavoritesFromLocalStorage();
            console.log("Loaded user favorites");
        }
    }
});

export const { addFavorite, removeFavorite, toggleFavorite, clearAllFavorites, loadUserFavorites } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.items.length;
export const selectIsFavorite = (state, recipeId) => {
    return state.favorites.items.some(item => 
        (item.id === recipeId) || 
        (item.idMeal === recipeId) || 
        (item._id === recipeId)
    );
};
export const selectLastUpdated = (state) => state.favorites.lastUpdated;

export default favoritesSlice.reducer;