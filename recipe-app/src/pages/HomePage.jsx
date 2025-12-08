import { useState } from "react";   
import './HomePage.css';
import RecipeCard from "../components/RecipeCard";


function HomePage() {
    const [recipes, setRecipes] = useState([
        {
         id: 1,
      name: 'Classic Spaghetti Carbonara',
      category: 'Italian',
      difficulty: 'Medium',
      cookTime: 25,
      servings: 4,
      ingredients: 'Spaghetti, eggs, pancetta, parmesan cheese, black pepper',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400'
    },
    {
      id: 2,
      name: 'Chicken Tikka Masala',
      category: 'Indian',
      difficulty: 'Hard',
      cookTime: 45,
      servings: 6,
      ingredients: 'Chicken, yogurt, tomatoes, cream, garam masala, ginger, garlic',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      category: 'Salad',
      difficulty: 'Easy',
      cookTime: 15,
      servings: 2,
      ingredients: 'Romaine lettuce, croutons, parmesan, caesar dressing, lemon',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400'
    },
    {
      id: 4,
      name: 'Chocolate Chip Cookies',
      category: 'Dessert',
      difficulty: 'Easy',
      cookTime: 20,
      servings: 24,
      ingredients: 'Flour, butter, sugar, eggs, chocolate chips, vanilla extract',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400'
    },
    {
      id: 5,
      name: 'Beef Tacos',
      category: 'Mexican',
      difficulty: 'Easy',
      cookTime: 30,
      servings: 4,
      ingredients: 'Ground beef, taco shells, lettuce, tomatoes, cheese, sour cream',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400'
    },
    {
      id: 6,
      name: 'Greek Moussaka',
      category: 'Greek',
      difficulty: 'Hard',
      cookTime: 90,
      servings: 8,
      ingredients: 'Eggplant, ground lamb, béchamel sauce, tomatoes, onions, cinnamon',
      image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400'
    }
  ]);

