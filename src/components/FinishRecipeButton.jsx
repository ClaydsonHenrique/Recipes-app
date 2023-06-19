import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function FinishRecipeButton(prop) {
  const [disabled, setSisabled] = useState(true);
  const history = useHistory();
  const storageData = localStorage.getItem('doneRecipes');
  const prevStorage = (storageData) ? JSON.parse(storageData) : [];

  const { ingredientList, selectedIngredient, recipe, type, id } = prop;

  useEffect(() => {
    if (
      selectedIngredient.length > 0 && selectedIngredient.length === ingredientList.length
    ) {
      return setSisabled(false);
    }
    return setSisabled(true);
  }, [selectedIngredient, ingredientList.length]);

  function doneRecipeObject() {
    const recipeInfo = {
      id,
      type: (type === 'meals') ? 'food' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: '',
      image: '',
      doneDate: new Date(),
      tags: [recipe.strTags || []],
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
    if (!storageData) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipeObject()]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify(
        [...prevStorage, doneRecipeObject()],
      ));
    }
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
