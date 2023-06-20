import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DoneRecipesButtons from '../components/DoneRecipesButtons';
import ShareButton from '../components/ShareButton';

export default function DoneRecipes() {
  const [doneRecipeStorage, setDoneRecipeStorage] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const MAX_NUMBER = 2;

  useEffect(() => {
    const storageData = localStorage.getItem('doneRecipes');
    const storage = (storageData) ? JSON.parse(storageData) : [];
    setDoneRecipeStorage(storage);
    setRecipes(storage);
  }, []);

  return (
    <main>
      <DoneRecipesButtons
        recipeStorage={ doneRecipeStorage }
        setRecipes={ setRecipes }
      />
      <ul>
        {
          recipes.map((recipe, index) => (
            <li key={ recipe.id }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <div>
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    width="150px"
                  />
                  <p data-testid={ `${index}-horizontal-name` }>
                    { recipe.name }
                  </p>
                </div>
              </Link>
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {
                    recipe.type === 'meals' ? (
                      `${recipe.nationality} - ${recipe.category}`) : (
                      `${recipe.alcoholicOrNot} - ${recipe.category}`
                    )
                  }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </p>
                {recipe.tags.map((tag, i) => i < MAX_NUMBER && (
                  <p
                    key={ tag }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </p>
                ))}
                <ShareButton
                  id={ recipe.id }
                  type={ recipe.type === 'meals' ? 'meals' : 'drinks' }
                  index={ index }
                />
              </div>
            </li>
          ))
        }
      </ul>
    </main>

  );
}
