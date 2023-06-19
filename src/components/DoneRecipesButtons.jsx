import React from 'react';

export default function DoneRecipesButtons(prop) {
  const { recipeStorage, setRecipes } = prop;

  function handleClick({ target: { name } }) {
    if (name === 'All') {
      setRecipes(recipeStorage);
      return;
    }
    const filtredRecipe = recipeStorage.filter((recipe) => recipe.type === name);
    setRecipes(filtredRecipe);
  }

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ (event) => handleClick(event) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="food"
        onClick={ (event) => handleClick(event) }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="drink"
        onClick={ (event) => handleClick(event) }
      >
        Drinks
      </button>
    </div>
  );
}
