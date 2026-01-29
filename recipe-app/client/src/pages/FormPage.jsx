import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { validateRecipeForm } from "../utils/validation";
import { recipesAPI } from '../services/api';
import './FormPage.css';

import useLocalStorage from "../hooks/useLocalStorage";



function FormPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const editRecipe = location.state?.recipe; // Recipe to edit (if any)
    const isEditMode = !!editRecipe;

    const [formDraft , setFormDraft]= useLocalStorage ('recipe-form-draft' , {
        name: '',
        category: '',
        difficulty: '',
        cookTime: '',
        servings: '',
        ingredients: '',
        instructions: '',
    });

    const [name , setName] = useState(isEditMode ? editRecipe.name : formDraft.name);
    const [category , setCategory] = useState(isEditMode ? editRecipe.category : formDraft.category);
    const [difficulty , setDifficulty] = useState(isEditMode ? editRecipe.difficulty : formDraft.difficulty);
    const [cookTime , setCookTime] = useState(isEditMode ? editRecipe.cookingTime : formDraft.cookTime);
    const [servings , setServings] = useState(isEditMode ? editRecipe.servings : formDraft.servings);
    const [ingredients , setIngredients] = useState(isEditMode ? editRecipe.ingredients.join('\n') : formDraft.ingredients);
    const [instructions , setInstructions]= useState(isEditMode ? editRecipe.instructions.join('\n') : formDraft.instructions);
   const [image , setImage]= useState(isEditMode ? editRecipe.image : formDraft.image);
   const[imagePreview , setImagePreview]= useState(isEditMode ? editRecipe.image : formDraft.image);

const [errors , setErrors] = useState('');
const [successMessage , setSuccessMessage] = useState('');
const [loading, setLoading] = useState(false);

const handleImageChange =(e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            setImagePreview(reader.result);
            if (!isEditMode) {
                updateDraft('image' , reader.result);
            }
        };
        reader.readAsDataURL(file);
    }
};

const updateDraft = (field , value) => {
    // Don't save draft when editing existing recipe
    if (!isEditMode) {
        setFormDraft ({
            ...formDraft ,
            [field] : value ,
        });
    }
};


const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate with string format first
    const validationData = { 
        name, 
        category, 
        difficulty, 
        cookTime: Number(cookTime), 
        servings: Number(servings), 
        ingredients, 
        instructions, 
        image 
    };

    const validationErrors = validateRecipeForm(validationData);

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSuccessMessage('');
        return;
    }

    // Convert to API format with arrays
    const formData = { 
        name, 
        category, 
        difficulty, 
        cookingTime: Number(cookTime), 
        servings: Number(servings), 
        ingredients: ingredients.split('\n').filter(i => i.trim()), 
        instructions: instructions.split('\n').filter(i => i.trim()), 
        image 
    };

    try {
        setLoading(true);
        setErrors({});

        let response;
        if (isEditMode) {
            response = await recipesAPI.update(editRecipe._id, formData);
            setSuccessMessage('Recipe updated successfully! Redirecting...');
        } else {
            response = await recipesAPI.create(formData);
            setSuccessMessage('Recipe added successfully! Redirecting...');
        }

        console.log('Recipe saved:', response.data);

        // Clear form draft only if creating new (not editing)
        if (!isEditMode) {
            setFormDraft({
                name: '',
                category: '',
                difficulty: '',
                cookTime: '',
                servings: '',
                ingredients: '',
                instructions: '',
                image: '',
            });
        }

        // Redirect to home after 1.5 seconds
        setTimeout(() => {
            navigate('/');
        }, 1500);

    } catch (error) {
        console.error('Error saving recipe:', error);
        console.error('Error response:', error.response?.data);
        
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.errors?.join(', ') ||
                           'An error occurred while saving the recipe. Please try again.';
        
        setErrors({ 
            submit: errorMessage
        });
        setSuccessMessage('');
    } finally {
        setLoading(false);
    }
};

return (
    <div className="form-page">
        <div className="form-header">
            <h1 className="page-title">{isEditMode ? 'Edit Recipe' : 'Add New Recipe'}</h1>
            <p className="page-subtitle">
                {isEditMode 
                    ? 'Update your recipe details below' 
                    : 'Fill out the form below to add a new recipe to your collection'
                }
            </p>
        </div>

        {successMessage && (
            <div className="success-banner" style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #c3e6cb'
            }}>
                ✅ {successMessage}
            </div>
        )}

        {errors.submit && (
            <div className="error-banner" style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb'
            }}>
                ❌ {errors.submit}
            </div>
        )}

        <div className="form-container">
            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input
                    id ="name"
                    type="text"
                    value={name}

                    onChange={(e) => 
                        {
                             setName (e.target.value) ;
                    updateDraft('name' , e.target.value);}}


                    placeholder="Enter recipe name"
                    className={errors.name ? 'input-error' : '' }

                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    value={category}
                    onChange={(e) => 
                        {setCategory (e.target.value)
                    updateDraft('category' , e.target.value);
                }}
                    className={errors.category ? 'input-error' : '' }
                    >
                        <option value="">Select Category</option>

                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Indian">Indian</option>
                        <option value="Salad">Salad</option>

                    </select>
                    {errors.category && <span className="error-message">{errors.category}</span>}
                </div>

                <div className="form-group">
<label htmlFor="image">Recipe Image (optional)</label>
<input
id="image"
type="file"
accept="image/*"
onChange={handleImageChange}
/>
{imagePreview && (
    <div className="image-preview">
                <img src={imagePreview} alt="Recipe preview" style={{ maxWidth: '200px', marginTop: '10px', borderRadius: '8px' }} />
    </div>
)}


                
               </div>
  

<div className="form-group">
<label htmlFor="difficulty">Difficulty</label>
<select
id="difficulty"
value={difficulty}
onChange={(e) => {
    setDifficulty(e.target.value);
    updateDraft('difficulty', e.target.value);
}}
className={errors.difficulty ? 'input-error' : ''}

>
<option value="">Select Difficulty</option>
<option value="Easy">Easy</option>
<option value="Medium">Medium</option>
<option value="Hard">Hard</option>
</select>
{errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
</div>

<div className="form-row">
<div className="form-group">
<label htmlFor="cookTime">Cook Time (minutes)</label>
<input
id="cookTime"
type="number"
value={cookTime}
onChange={(e) => {
    setCookTime(e.target.value);
    updateDraft('cookTime', e.target.value);
}}
placeholder="e.g., 30"
min="1"
className={errors.cookTime ? 'input-error' : ''}
/>
{errors.cookTime && <span className="error-message">{errors.cookTime}</span>}

</div>
<div className="form-group">
<label htmlFor="servings">Servings</label>
<input
id="servings"
type="number"
value={servings}
onChange={(e) => {
    setServings(e.target.value);
    updateDraft('servings', e.target.value);
}}
placeholder="e.g., 4"
min="1"
className={errors.servings ? 'input-error' : ''}
/>
{errors.servings && <span className="error-message">{errors.servings}</span>}
</div>

</div>

<div className="form-group">
<label htmlFor="ingredients">Ingredients</label>
<textarea
id="ingredients"
value={ingredients}
onChange={(e) => {
    setIngredients(e.target.value);
    updateDraft('ingredients', e.target.value);
}}
placeholder="Enter ingredients separated by commas"
className={errors.ingredients ? 'input-error' : ''}
rows="4"
/>
{errors.ingredients && <span className="error-message">{errors.ingredients}</span>}
</div>


<div className="form-group">
<label htmlFor="instructions">Instructions</label>
<textarea
id="instructions"
value={instructions}
onChange={(e) => {
    setInstructions(e.target.value);
    updateDraft('instructions', e.target.value);
}}
placeholder="Enter step-by-step cooking instructions"
rows="6"
className={errors.instructions ? 'input-error' : ''}
/>
{errors.instructions && <span className="error-message">{errors.instructions}</span>}
</div>

<button type="submit" className="submit-btn" disabled={loading}>
    {loading ? 'Saving...' : (isEditMode ? 'Update Recipe' : 'Submit Recipe')}
</button>

            </form>
        </div>
    </div>
);
}

export default FormPage;