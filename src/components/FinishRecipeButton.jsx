import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function FinishRecipeButton(prop) {
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const storageData = localStorage.getItem('doneRecipes');
  const prevStorage = (storageData) ? JSON.parse(storageData) : [];

  const { ingredientList, selectedIngredient, recipe, type, id } = prop;

  useEffect(() => {
    if (
      selectedIngredient.length > 0 && selectedIngredient.length === ingredientList.length
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedIngredient, ingredientList.length]);

  function doneRecipeObject() {
    const recipeInfo = {
      id,
      type: (type === 'meals') ? 'meals' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: new Date(),
      tags: recipe.strTags ? [recipe.strTags] : [],
    };

    if (type === 'meals') {
      recipeInfo.name = recipe.strMeal;
      recipeInfo.image = recipe.strMealThumb;
    } else {
      recipeInfo.name = recipe.strDrink;
      recipeInfo.image = recipe.strDrinkThumb;
      recipeInfo.alcoholicOrNot = recipe.strAlcoholic;
    }

    return recipeInfo;
  }

  function doneRecipeStorage() {
    const doneRecipe = doneRecipeObject();
    const updatedStorage = [...prevStorage, doneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedStorage));
  }

  function handleClick() {
    doneRecipeStorage();
    history.push('/done-recipes');
  }

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      onClick={ handleClick }
      disabled={ disabled }
    >
      Finish Recipe
    </button>
  );
}
