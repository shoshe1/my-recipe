import { useState } from "react";

//import { validateRecipeForm } from "../utils/validation";
//import './FormPage.css';


function FormPage() {
    const [name , setName] = useState('');
    const [category , setCategory] = useState('');
    const [difficulty , setDifficulty] = useState('');
    const [cookTime , setCookTime] = useState('');
    const [servings , setServings] = useState('');
    const [ingredients , setIngredients] = useState('');
    const [instructions , setInstructions]= useState('');


const [errors , setErrors] = useState('');
const[successMessage , setSuccessMessage]=useState('');




const handleSubmit=(e)=>{
    e.preventDefault();


    const formData={ name , category , difficulty , cookTime , servings , ingredients , instructions };


    const validationErrors= validateRecipeForm(formData);

    if (Object.keys (validationErrors).length >0){
        setErrors (validationErrors);
        setSuccessMessage('');
    } else {
        setErrors({});
        setSuccessMessage('Recipe submitted successfully!');


       setTimeout(() => {
        setName('');
        setCategory('');
        setDifficulty('');
        setCookTime('');
        setServings('');
        setIngredients('');
        setInstructions('');
        setSuccessMessage('');
       }, 2000);

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

                    onChange={(e) => setName (e.target.value)}

                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory (e.target.value)}
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
  

<div className="difficulty">
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

successMessage && (
    <div className="success-message">
        {successMessage}
    </div>
)

<button type="submit" className="submit-button">
    Submit Recipe
</button>


            </form>
        </div>
    </div>
);
}

export default FormPage;