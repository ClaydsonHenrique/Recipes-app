import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { meals, drinks, mealCategories, drinkCategories } = useContext(RecipesContext);
  const location = useLocation();

  const recipes = location.pathname === '/meals' ? meals : drinks;
  const categories = location.pathname === '/meals' ? mealCategories : drinkCategories;

  return (
    <div>
      <h2>{location.pathname === '/meals' ? 'Meals' : 'Drinks'}</h2>

      <div>
        <h3>Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={ index }>
              <button data-testid={ `${category.strCategory}-category-filter` }>
                {category.strCategory}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <h3>Recipes</h3>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>
              {recipe.strMeal || recipe.strDrink}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recipes;
