import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import Context from '../context/Context';

function FavoriteRecipes() {
  const [favoriteRecipeStorage, setFavoriteRecipeStorage] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const { favorite } = useContext(Context);
  const storageData = localStorage.getItem('favoriteRecipes');

  useEffect(() => {
    const storage = (storageData) ? JSON.parse(storageData) : [];
    setFavoriteRecipeStorage(storage);
    setRecipes(storage);
  }, [favorite, storageData]);

  return (

    <main>
      <DoneRecipesButtons
        recipeStorage={ favoriteRecipeStorage }
        setRecipes={ setRecipes }
      />
      <ul>
        {
          recipes.map((recipe, index) => (
            <li key={ recipe.id }>
              <Link to={ `/${recipe.type}/${recipe.id}` }>
                <div>
                  <img
                    width="150px"
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt={ recipe.name }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </div>
              </Link>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {
                  recipe.type === 'meals' ? (
                    `${recipe.nationality} - ${recipe.category}`) : (
                    `${recipe.alcoholicOrNot} - ${recipe.category}`
                  )
                }
              </p>
              <ShareButton
                id={ recipe.id }
                type={ recipe.type === 'meals' ? 'meals' : 'drinks' }
                index={ index }
              />
              <FavoriteButton recipe={ recipe } index={ index } />
            </li>
          ))
        }
      </ul>
    </main>

  );
}

export default FavoriteRecipes;
