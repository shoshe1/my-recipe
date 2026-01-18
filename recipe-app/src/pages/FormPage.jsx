import { useState } from "react";

import { validateRecipeForm } from "../utils/validation";
import './FormPage.css';

import useLocalStorage from "../hooks/useLocalStorage";



function FormPage() {

    const [formDraft , setFormDraft]= useLocalStorage ('recipe-form-draft' , {
        name: '',
        category: '',
        difficulty: '',
        cookTime: '',
        servings: '',
        ingredients: '',
        instructions: '',
    });

    const [name , setName] = useState(formDraft.name  );
    const [category , setCategory] = useState(formDraft.category );
    const [difficulty , setDifficulty] = useState(formDraft.difficulty );
    const [cookTime , setCookTime] = useState(formDraft.cookTime);
    const [servings , setServings] = useState(formDraft.servings );
    const [ingredients , setIngredients] = useState(formDraft.ingredients);
    const [instructions , setInstructions]= useState(formDraft.instructions);
   const [image , setImage]= useState(formDraft.image );
   const[imagePreview , setImagePreview]= useState(formDraft.image );

const [errors , setErrors] = useState('');
const[successMessage , setSuccessMessage]=useState('');

const handleImageChange =(e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);

            setImagePreview(reader.result);
            updateDraft('image' , reader.result);
        };
        reader.readAsDataURL(file);
    }
};
const updateDraft = (field , value) => {
    setFormDraft ({
        ...formDraft ,
        [field] : value ,
    });
};



const handleSubmit=(e)=>{
    e.preventDefault();


    const formData={ name , category , difficulty , cookTime :Number(cookTime) , servings : Number(servings)    , ingredients , instructions , image    };


    const validationErrors= validateRecipeForm(formData);

    if (Object.keys (validationErrors).length >0){
        setErrors (validationErrors);
        setSuccessMessage('');
    } 
    try{
        const existingRecipes = JSON.parse(localStorage.getItem('my-recipes') || '[]');

        const defaultImages=[
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400'
      ];

      const newRecipe ={
        id: Date.now(),
        ...formData,
        image: image || defaultImages[Math.floor(Math.random() * defaultImages.length)]
      };

        const updatedRecipes =[...existingRecipes , newRecipe];
        localStorage.setItem('my-recipes' , JSON.stringify (updatedRecipes) );

        window.dispatchEvent (new Event ('recipe-added'));

        console.log('Recipe added: ' , newRecipe);
        setErrors({});
        setSuccessMessage('Recipe added successfully!');

        setFormDraft ({
            name: '',
            category: '',
            difficulty: '',
            cookTime: '',
            servings: '',
            ingredients: '',
            instructions: '',
            image: '',
        });


        setName('');
        setCategory('');
        setDifficulty('');
        setCookTime('');
        setServings('');
        setIngredients('');
        setInstructions('');
        setImage('');
        setImagePreview('');
        setCategory('');
        setDifficulty('');
        setCookTime('');
        setServings('');
        setIngredients('');
        setInstructions('');
      

        window.scrollTo({ top: 0 , behavior: 'smooth' });


       
     }
     catch(error)
     {
        console.error('Error saving recipe: ' , error);
        setErrors ({ submit : 'An error occurred while saving the recipe. Please try again.' });
     }
    };
     
  

return (
    <div className="form-page">
        <div className="form-header">
            <h1 className="page-title">Add New Recipe</h1>
            <p className="page-subtitle">
                Fill out the form below to add a new recipe to your collection
            </p>
        </div>
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
onChange={(e) => setDifficulty (e.target.value)}

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
onChange={(e) => setCookTime (e.target.value)}
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
onChange={(e) => setServings (e.target.value)}
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
onChange={(e) => setIngredients (e.target.value)}
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
onChange={(e) => setInstructions (e.target.value)}
placeholder="Enter step-by-step cooking instructions"
rows="6"
className={errors.instructions ? 'input-error' : ''}
/>
{errors.instructions && <span className="error-message">{errors.instructions}</span>}
</div>



<button type="submit" className="submit-btn">
    Submit Recipe
</button>


            </form>
        </div>
    </div>
);
}

export default FormPage;