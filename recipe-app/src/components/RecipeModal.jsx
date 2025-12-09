
import './RecipeModal.css';

function RecipeModal({ recipe, onClose }) {

    const getIngredientsList = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`] ;
            const measure = recipe[`strMeasure${i}`] ;
            if (ingredient && ingredient.trim() ) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
        return ingredients;
    };

    const ingredientsList = getIngredientsList();
    return (
         <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e)=>e.stopPropagation()}>
              <button className='modal-close' onClick={onClose}>
                x
                </button> 
                
                <div className='modal-header'>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal}
                    className='modal-image' />

                    <div className='modal-title-section'>
                        <h2>{recipe.strMeal}</h2>
                        <div className='modal-tags'>
                            {recipe.strCategory && (
                                <span className='modal-tag category-tag'>
                                    {recipe.strCategory}
                                </span>
                            )}
                            {recipe.strArea && (
                                <span className='modal-tag area-tag'>
                                    {recipe.strArea}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className='modal-body'>
                    <div className='modal-section'>
                        <h3>Ingredients</h3>
                        <ul className='ingredients-list'>
                            {ingredientsList.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>


                    <div className='modal-section'>
                        <h3>Instructions</h3>
                        <p className='instructions-text'>{recipe.strInstructions}</p>
                    </div>

                    {recipe.strYoutube && (
                    <div className='modal-section'>
                        <h3>Video Tutorial</h3>
                        <a
                            href={recipe.strYoutube}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='youtube-link'
                        >
                            Watch on YouTube
                        </a>
                    </div>
                    )}


            </div>
                 </div>
                 </div>
                 );
}

                 export default RecipeModal;
