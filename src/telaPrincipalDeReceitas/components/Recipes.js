import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function Recipes() {
  const { meals, drinks } = useContext(RecipesContext);
  const location = useLocation();

  const recipes = location.pathname === '/meals' ? meals : drinks;

  return (
    <div>
      <h2>{location.pathname === '/meals' ? 'Meals' : 'Drinks'}</h2>
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
