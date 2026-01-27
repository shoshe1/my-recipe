
import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export async function searchRecipes(query) {

    try
    {
        const response = await axios.get(`${BASE_URL}/search.php`, {
        params:{
            s: query
        }
    });
        return response.data.meals;
    }
    catch (error)
    {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

    export async function getRandomRecipe() {
        try {
            const response = await axios.get(`${BASE_URL}/random.php`);
            return response.data.meals[0];
        } catch (error) {
            console.error('Error fetching random recipe:', error);
            throw error;
        }
    }

    export async function getRecipeById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/lookup.php`, {

                params: {
                    i: id
                }
            });
            return response.data.meals[0];
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            throw error;
        }
    }

